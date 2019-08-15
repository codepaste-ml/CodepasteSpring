package ru.darkkeks.codepaste;

import org.springframework.data.repository.CrudRepository;
import ru.darkkeks.codepaste.model.Language;

public interface LanguageRepository extends CrudRepository<Language, Integer> {
}
