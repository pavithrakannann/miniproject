// package com.example.discount.store.entity;

// import com.fasterxml.jackson.annotation.JsonProperty;

// import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.Table;

// @Entity
// @Table(name = "store")
// public class Store {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     private String name;

//     private String category;

//     private String address;

//     @JsonProperty(access = JsonProperty.Access.READ_ONLY)
//     private Double latitude;

//     @JsonProperty(access = JsonProperty.Access.READ_ONLY)
//     private Double longitude;

//     public Store(){}

//     public Long getId(){ return id; }

//     public String getName(){ return name; }

//     public String getCategory(){ return category; }

//     public String getAddress(){ return address; }

//     public Double getLatitude(){ return latitude; }

//     public Double getLongitude(){ return longitude; }

//     public void setId(Long id){ this.id=id; }

//     public void setName(String name){ this.name=name; }

//     public void setCategory(String category){ this.category=category; }

//     public void setAddress(String address){ this.address=address; }

//     public void setLatitude(Double latitude){ this.latitude=latitude; }

//     public void setLongitude(Double longitude){ this.longitude=longitude; }

// }


package com.example.discount.store.entity;

import com.example.discount.user.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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

    // 🔥 VERY IMPORTANT (OWNER LINK)
    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonIgnore
    private User owner;

    public Store(){}

    public Long getId(){ return id; }
    public String getName(){ return name; }
    public String getCategory(){ return category; }
    public String getAddress(){ return address; }
    public Double getLatitude(){ return latitude; }
    public Double getLongitude(){ return longitude; }
    public User getOwner(){ return owner; }

    public void setId(Long id){ this.id=id; }
    public void setName(String name){ this.name=name; }
    public void setCategory(String category){ this.category=category; }
    public void setAddress(String address){ this.address=address; }
    public void setLatitude(Double latitude){ this.latitude=latitude; }
    public void setLongitude(Double longitude){ this.longitude=longitude; }
    public void setOwner(User owner){ this.owner = owner; }
}