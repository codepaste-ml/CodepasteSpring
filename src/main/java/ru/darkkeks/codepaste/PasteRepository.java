package ru.darkkeks.codepaste;

import org.springframework.data.repository.CrudRepository;
import ru.darkkeks.codepaste.model.Paste;

public interface PasteRepository extends CrudRepository<Paste, Integer> {
    Paste findByAlias(String alias);
}
