package com.example.discount.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "store")
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String category;

    private String address;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Double latitude;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Double longitude;

    public Store(){}

    public Long getId(){ return id; }

    public String getName(){ return name; }

    public String getCategory(){ return category; }

    public String getAddress(){ return address; }

    public Double getLatitude(){ return latitude; }

    public Double getLongitude(){ return longitude; }

    public void setId(Long id){ this.id=id; }

    public void setName(String name){ this.name=name; }

    public void setCategory(String category){ this.category=category; }

    public void setAddress(String address){ this.address=address; }

    public void setLatitude(Double latitude){ this.latitude=latitude; }

    public void setLongitude(Double longitude){ this.longitude=longitude; }

}