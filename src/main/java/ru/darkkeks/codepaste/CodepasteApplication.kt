package ru.darkkeks.codepaste

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.data.repository.CrudRepository
import ru.darkkeks.codepaste.model.Language
import ru.darkkeks.codepaste.model.Paste
import java.util.Optional


@SpringBootApplication
class CodepasteApplication

fun main(vararg args: String) {
    runApplication<CodepasteApplication>(*args)
}

interface PasteRepository : CrudRepository<Paste?, Int?> {
    fun findByAlias(alias: String?): Optional<Paste?>?
}

interface LanguageRepository : CrudRepository<Language?, Int?> {
    fun findByName(name: String?): Optional<Language?>?
}
