package ru.darkkeks.codepaste.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.darkkeks.codepaste.alias.AliasProducer;
import ru.darkkeks.codepaste.exception.LanguageNotFoundException;
import ru.darkkeks.codepaste.model.Language;
import ru.darkkeks.codepaste.model.Paste;
import ru.darkkeks.codepaste.model.PasteDTO;
import ru.darkkeks.codepaste.LanguageRepository;
import ru.darkkeks.codepaste.PasteRepository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class CodepasteController {

    private final AliasProducer aliasProducer;
    private final PasteRepository pasteRepository;
    private final LanguageRepository languageRepository;

    private final String defaultLanguageName;

    @Autowired
    public CodepasteController(AliasProducer aliasProducer, PasteRepository pasteRepository,
                               LanguageRepository languageRepository,
                               @Value("${default_language}") String defaultLanguageName) {
        this.aliasProducer = aliasProducer;
        this.pasteRepository = pasteRepository;
        this.languageRepository = languageRepository;
        this.defaultLanguageName = defaultLanguageName;
    }

    @GetMapping(value = "/get/{alias}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Paste> getPaste(@PathVariable String alias) {
        Optional<Paste> paste = pasteRepository.findByAlias(alias);
        return ResponseEntity.of(paste);
    }

    @PostMapping("/create")
    public Paste create(@Validated @RequestBody PasteDTO pasteDTO) {
        Paste paste = new Paste();

        String languageName = pasteDTO.getLanguage();

        Optional<Language> language = languageRepository.findByName(
                languageName != null ? languageName : defaultLanguageName);

        paste.setCreationDate(new Date());
        paste.setName(pasteDTO.getName());
        paste.setSource(pasteDTO.getSource());

        paste.setLanguage(language.orElseThrow(() -> new LanguageNotFoundException(languageName)));

        paste = pasteRepository.save(paste);
        String alias = aliasProducer.createAlias(paste);
        paste.setAlias(alias);
        pasteRepository.save(paste);
        return paste;
    }

    @GetMapping("/languages")
    public LanguageSet getLanguages() {
        List<Language> languages = new ArrayList<>();
        languageRepository.findAll().forEach(languages::add);

        Optional<Language> defaultLanguage = languages.stream()
                .filter(l -> l.getName().equals(defaultLanguageName))
                .findFirst();

        String defaultName = defaultLanguage.map(Language::getName).orElse(null);

        return new LanguageSet(languages, defaultName);
    }

    private static class LanguageSet {
        public final String defaultName;
        public final Iterable<Language> languages;

        public LanguageSet(Iterable<Language> languages, String defaultName) {
            this.languages = languages;
            this.defaultName = defaultName;
        }
    }
}
