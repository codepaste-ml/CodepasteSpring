package ru.darkkeks.codepaste.exception;

public class ApiError {

    public final String message;
    public final String exception;

    public ApiError(Exception exception) {
        this.message = exception.getMessage();
        this.exception = exception.getClass().getName();
    }

}
