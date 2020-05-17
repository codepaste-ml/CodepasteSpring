package ru.darkkeks.codepaste.repository;

import org.springframework.data.repository.CrudRepository;
import ru.darkkeks.codepaste.model.Paste;

import java.util.Optional;

public interface PasteRepository extends CrudRepository<Paste, Integer> {
    Optional<Paste> findByAlias(String alias);
}
