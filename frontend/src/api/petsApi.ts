import axios from 'axios';
import { demoPets } from '../data/demoPets';

const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API = `${API_BASE}/api/v1/pets`;

export interface PetSummary {
  id: number;
  name: string;
  breed: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface PetDetail {
  id: number;
  name: string;
  breed: string;
  age: number;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
}

// Convert demoPets to match the new API structure
const mapToLocalPets = (): PetDetail[] => {
  return demoPets.map(p => ({
    id: p.id!,
    name: p.name,
    breed: p.breed,
    age: p.age,
    price: p.price,
    description: p.description,
    imageUrl: p.imageUrl,
    category: p.species.toUpperCase() === 'RABBIT' ? 'OTHER' : p.species.toUpperCase(),
  }));
};

let useLocal = false;

export const petsApi = {
  getAll: async (category?: string, search?: string): Promise<PetSummary[]> => {
    try {
      let url = API + '?';
      if (category && category !== 'All') url += `category=${category}&`;
      if (search) url += `search=${search}`;
      const res = await axios.get<PetSummary[]>(url, { timeout: 2000 });
      useLocal = false;
      return res.data;
    } catch {
      useLocal = true;
      let localPets = mapToLocalPets();
      
      if (category && category !== 'All') {
        localPets = localPets.filter(p => p.category === category.toUpperCase());
      }
      if (search) {
        const q = search.toLowerCase();
        localPets = localPets.filter(p => 
          p.name.toLowerCase().includes(q) || 
          p.breed.toLowerCase().includes(q) || 
          p.description.toLowerCase().includes(q)
        );
      }
      return localPets;
    }
  },

  getById: async (id: number): Promise<PetDetail> => {
    if (useLocal) {
      const pet = mapToLocalPets().find(p => p.id === id);
      if (pet) return pet;
      throw new Error('Pet not found');
    }
    const res = await axios.get<PetDetail>(`${API}/${id}`);
    return res.data;
  }
};
