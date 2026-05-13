package com.petstore.pet;

import com.petstore.pet.dto.PetSummaryDto;
import com.petstore.pet.dto.PetDetailDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    public List<PetSummaryDto> getPets(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        return petService.searchPets(category, search);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PetDetailDto> getPetById(@PathVariable Long id) {
        PetDetailDto pet = petService.getPetById(id);
        if (pet != null) {
            return ResponseEntity.ok(pet);
        }
        return ResponseEntity.notFound().build();
    }
}
