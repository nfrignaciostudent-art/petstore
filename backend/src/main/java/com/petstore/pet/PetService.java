package com.petstore.pet;

import com.petstore.pet.dto.PetSummaryDto;
import com.petstore.pet.dto.PetDetailDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<PetSummaryDto> searchPets(String categoryStr, String search) {
        PetCategory category = null;
        if (categoryStr != null && !categoryStr.isEmpty()) {
            try {
                category = PetCategory.valueOf(categoryStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Ignore invalid category
            }
        }
        
        List<Pet> pets = petRepository.searchPets(category, search);
        return pets.stream().map(this::mapToSummaryDto).collect(Collectors.toList());
    }

    public PetDetailDto getPetById(Long id) {
        return petRepository.findById(id).map(this::mapToDetailDto).orElse(null);
    }

    private PetSummaryDto mapToSummaryDto(Pet pet) {
        PetSummaryDto dto = new PetSummaryDto();
        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setBreed(pet.getBreed());
        dto.setPrice(pet.getPrice());
        dto.setImageUrl(pet.getImageUrl());
        dto.setCategory(pet.getCategory());
        return dto;
    }

    private PetDetailDto mapToDetailDto(Pet pet) {
        PetDetailDto dto = new PetDetailDto();
        dto.setId(pet.getId());
        dto.setName(pet.getName());
        dto.setBreed(pet.getBreed());
        dto.setAge(pet.getAge());
        dto.setPrice(pet.getPrice());
        dto.setDescription(pet.getDescription());
        dto.setImageUrl(pet.getImageUrl());
        dto.setCategory(pet.getCategory());
        return dto;
    }
}
