import axios from 'axios';
import type { Pet } from './types';
import { demoPets } from './data/demoPets';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const API = `${API_BASE}/api/pets`;

let localPets: Pet[] = [...demoPets];
let nextId = 100;
let useLocal = false;

export const petApi = {
  getAll: async (): Promise<Pet[]> => {
    try {
      const res = await axios.get<Pet[]>(API, { timeout: 5000 });
      useLocal = false;
      return res.data;
    } catch {
      useLocal = true;
      return [...localPets];
    }
  },

  getById: async (id: number): Promise<Pet> => {
    if (useLocal) {
      const pet = localPets.find(p => p.id === id);
      if (pet) return { ...pet };
      throw new Error('Not found');
    }
    const res = await axios.get<Pet>(`${API}/${id}`);
    return res.data;
  },

  create: async (pet: Omit<Pet, 'id'>): Promise<Pet> => {
    if (useLocal) {
      const newPet = { ...pet, id: nextId++ };
      localPets.push(newPet);
      return { ...newPet };
    }
    const res = await axios.post<Pet>(API, pet);
    return res.data;
  },

  update: async (id: number, pet: Omit<Pet, 'id'>): Promise<Pet> => {
    if (useLocal) {
      const idx = localPets.findIndex(p => p.id === id);
      if (idx !== -1) {
        localPets[idx] = { ...pet, id };
        return { ...localPets[idx] };
      }
      throw new Error('Not found');
    }
    const res = await axios.put<Pet>(`${API}/${id}`, pet);
    return res.data;
  },

  delete: async (id: number): Promise<void> => {
    if (useLocal) {
      localPets = localPets.filter(p => p.id !== id);
      return;
    }
    await axios.delete(`${API}/${id}`);
  },

  search: async (keyword: string): Promise<Pet[]> => {
    if (useLocal) {
      const q = keyword.toLowerCase();
      return localPets.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.species.toLowerCase().includes(q) ||
        p.breed.toLowerCase().includes(q)
      );
    }
    try {
      const res = await axios.get<Pet[]>(`${API}/search/${keyword}`);
      return res.data;
    } catch {
      return [];
    }
  },
};
