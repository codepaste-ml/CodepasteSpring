package ru.darkkeks.codepaste.model;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Paste {

    @Id
    @GeneratedValue
    private int id;

    @Column(unique = true)
    private String alias;

    @OneToOne(targetEntity = Language.class)
    private Language language;

    private boolean isBot;

    @OneToOne(targetEntity = BotUser.class)
    private BotUser author;

    private Date creationDate;

    private String name;

    private String source;

    public Paste() {
    }

    public Paste(Language language, String source) {
        this.language = language;
        this.source = source;
        creationDate = new Date();
        name = "Untitled";
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public boolean isBot() {
        return isBot;
    }

    public void setBot(boolean bot) {
        isBot = bot;
    }

    public BotUser getAuthor() {
        return author;
    }

    public void setAuthor(BotUser author) {
        this.author = author;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }
}
