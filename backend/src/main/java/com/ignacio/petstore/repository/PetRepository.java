package com.ignacio.petstore.repository;

import com.ignacio.petstore.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findBySpeciesIgnoreCase(String species);
    List<Pet> findByAvailableTrue();
    List<Pet> findByNameContainingIgnoreCaseOrSpeciesContainingIgnoreCaseOrBreedContainingIgnoreCase(
            String name, String species, String breed);
}
