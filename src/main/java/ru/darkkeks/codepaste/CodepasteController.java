package ru.darkkeks.codepaste;

import org.springframework.web.bind.annotation.*;
import ru.darkkeks.codepaste.alias.AliasProducer;
import ru.darkkeks.codepaste.model.Language;
import ru.darkkeks.codepaste.model.Paste;

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
    public String crate(@RequestBody String source) {
        Paste paste = new Paste();
        paste.setSource(source);
        paste = pasteRepository.save(paste);
        String alias = aliasProducer.createAlias(paste);
        paste.setAlias(alias);
        pasteRepository.save(paste);
        return alias;
    }

    @GetMapping("/lang")
    public Iterable<Language> getLanguages() {
        return languageRepository.findAll();
    }
}
