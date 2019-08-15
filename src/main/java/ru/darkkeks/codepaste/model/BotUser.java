package ru.darkkeks.codepaste.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class BotUser {

    @Id
    @GeneratedValue
    private int id;

    @Column(unique = true, nullable = false)
    private int telegramId;

    private String telegramUsername;

    public BotUser() {
    }

    public BotUser(int telegramId, String telegramUsername) {
        this.telegramId = telegramId;
        this.telegramUsername = telegramUsername;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTelegramId() {
        return telegramId;
    }

    public void setTelegramId(int telegramId) {
        this.telegramId = telegramId;
    }

    public String getTelegramUsername() {
        return telegramUsername;
    }

    public void setTelegramUsername(String telegramUsername) {
        this.telegramUsername = telegramUsername;
    }
}
