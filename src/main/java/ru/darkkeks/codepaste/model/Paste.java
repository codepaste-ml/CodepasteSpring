package ru.darkkeks.codepaste.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class Paste {

    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;

    @Column(unique = true)
    private String alias;

    @OneToOne(targetEntity = Language.class)
    private Language language;

    private boolean createdUsingBot;

    @JsonIgnore
    @OneToOne(targetEntity = BotUser.class)
    private BotUser author;

    private Date creationDate;

    private String name;

    @Column(columnDefinition = "Text")
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

    public boolean isCreatedUsingBot() {
        return createdUsingBot;
    }

    public void setCreatedUsingBot(boolean createdUsingBot) {
        this.createdUsingBot = createdUsingBot;
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
