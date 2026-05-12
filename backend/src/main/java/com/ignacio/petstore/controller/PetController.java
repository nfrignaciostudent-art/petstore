package com.ignacio.petstore.controller;

import com.ignacio.petstore.model.Pet;
import com.ignacio.petstore.repository.PetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getPetById(@PathVariable Long id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Pet createPet(@RequestBody Pet pet) {
        return petRepository.save(pet);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pet> updatePet(@PathVariable Long id, @RequestBody Pet petDetails) {
        return petRepository.findById(id).map(pet -> {
            pet.setName(petDetails.getName());
            pet.setSpecies(petDetails.getSpecies());
            pet.setBreed(petDetails.getBreed());
            pet.setAge(petDetails.getAge());
            pet.setPrice(petDetails.getPrice());
            pet.setDescription(petDetails.getDescription());
            pet.setImageUrl(petDetails.getImageUrl());
            pet.setCategory(petDetails.getCategory());
            pet.setAvailable(petDetails.getAvailable());
            return ResponseEntity.ok(petRepository.save(pet));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id) {
        if (petRepository.existsById(id)) {
            petRepository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/species/{species}")
    public List<Pet> getBySpecies(@PathVariable String species) {
        return petRepository.findBySpeciesIgnoreCase(species);
    }

    @GetMapping("/search/{keyword}")
    public List<Pet> searchPets(@PathVariable String keyword) {
        return petRepository.findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCaseOrBreedContainingIgnoreCase(
                keyword, keyword, keyword);
    }

    @GetMapping("/available")
    public List<Pet> getAvailable() {
        return petRepository.findByAvailableTrue();
    }
}
