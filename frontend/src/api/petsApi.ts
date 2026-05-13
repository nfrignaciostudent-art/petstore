import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
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

export const petsApi = {
  getAll: async (category?: string, search?: string): Promise<PetSummary[]> => {
    let url = API + '?';
    if (category && category !== 'All') url += `category=${category}&`;
    if (search) url += `search=${search}`;
    const res = await axios.get<PetSummary[]>(url);
    return res.data;
  },

  getById: async (id: number): Promise<PetDetail> => {
    const res = await axios.get<PetDetail>(`${API}/${id}`);
    return res.data;
  }
};
