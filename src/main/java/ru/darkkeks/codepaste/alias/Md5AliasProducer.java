package ru.darkkeks.codepaste.alias;

import org.springframework.stereotype.Component;
import org.springframework.util.DigestUtils;
import ru.darkkeks.codepaste.model.Paste;

@Component
public class Md5AliasProducer implements AliasProducer {

    @Override
    public String createAlias(Paste paste) {
        return DigestUtils.md5DigestAsHex(String.valueOf(paste.getId()).getBytes()).substring(0, 8);
    }
}
