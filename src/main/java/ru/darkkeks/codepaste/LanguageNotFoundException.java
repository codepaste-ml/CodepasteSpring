package ru.darkkeks.codepaste;

public class LanguageNotFoundException extends IllegalArgumentException {

    public LanguageNotFoundException(String s) {
        super(s);
    }

    public LanguageNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public LanguageNotFoundException(Throwable cause) {
        super(cause);
    }
}
