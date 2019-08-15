package ru.darkkeks.codepaste.alias;

import ru.darkkeks.codepaste.model.Paste;

public interface AliasProducer {
    String createAlias(Paste paste);
}
