package ru.darkkeks.codepaste.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Language {

    @Id
    @GeneratedValue
    @JsonIgnore
    private int id;

    private String alias;

    private String name;

    private String prismClassName;

    public Language() {
    }

    public Language(String alias, String name, String prismClassName) {
        this.alias = alias;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getPrismClassName() {
        return prismClassName;
    }

    public void setPrismClassName(String prismClassName) {
        this.prismClassName = prismClassName;
    }
}
