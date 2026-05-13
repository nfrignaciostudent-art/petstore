package com.petstore.pet.dto;

import com.petstore.pet.PetCategory;

public class PetDetailDto {
    private Long id;
    private String name;
    private String breed;
    private Integer age;
    private Double price;
    private String description;
    private String imageUrl;
    private PetCategory category;

    // Constructors, Getters, and Setters
    public PetDetailDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public PetCategory getCategory() { return category; }
    public void setCategory(PetCategory category) { this.category = category; }
}
