package ru.darkkeks.codepaste.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class LanguageNotFoundException extends IllegalArgumentException {

    public LanguageNotFoundException(String language) {
        super("Language not found: " + language);
    }

}
