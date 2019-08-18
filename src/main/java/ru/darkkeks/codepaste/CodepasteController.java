package ru.darkkeks.codepaste;

import org.springframework.web.bind.annotation.*;
import ru.darkkeks.codepaste.alias.AliasProducer;
import ru.darkkeks.codepaste.model.Language;
import ru.darkkeks.codepaste.model.Paste;
import ru.darkkeks.codepaste.model.PasteDTO;

import javax.validation.Valid;
import java.util.Date;

@RestController
@RequestMapping("/api")
public class CodepasteController {

    private final AliasProducer aliasProducer;
    private final PasteRepository pasteRepository;
    private final LanguageRepository languageRepository;

    public CodepasteController(AliasProducer aliasProducer, PasteRepository pasteRepository, LanguageRepository languageRepository) {
        this.aliasProducer = aliasProducer;
        this.pasteRepository = pasteRepository;
        this.languageRepository = languageRepository;
    }

    @GetMapping("/get/{alias}")
    public Paste getPaste(@PathVariable String alias) {
        return pasteRepository.findByAlias(alias);
    }

    @PostMapping("create")
    public Paste create(@Valid @RequestBody PasteDTO pasteDTO) {
        Paste paste = new Paste();

        paste.setCreationDate(new Date());
        paste.setName(pasteDTO.getName());
        paste.setSource(pasteDTO.getSource());

        String languageName = pasteDTO.getLanguage();
        Language language = languageRepository.findByName(languageName);

        if(language == null) {
            throw new LanguageNotFoundException(languageName);
        }

        paste.setLanguage(language);

        paste = pasteRepository.save(paste);
        String alias = aliasProducer.createAlias(paste);
        paste.setAlias(alias);
        pasteRepository.save(paste);
        return paste;
    }

    @GetMapping("/lang")
    public Iterable<Language> getLanguages() {
        return languageRepository.findAll();
    }

    @ExceptionHandler(LanguageNotFoundException.class)
    public ApiError handleLanguageNotFound() {
        return new ApiError("Language not found");
    }
}
