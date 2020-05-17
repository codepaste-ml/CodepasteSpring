package ru.darkkeks.codepaste.repository;

import org.springframework.data.repository.CrudRepository;
import ru.darkkeks.codepaste.model.Language;

import java.util.Optional;

public interface LanguageRepository extends CrudRepository<Language, Integer> {
    Optional<Language> findByName(String name);
}
