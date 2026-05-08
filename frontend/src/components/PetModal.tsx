import { Dialog, DialogContent, DialogActions, TextField, Button, MenuItem, Box, Typography, Avatar } from '@mui/material';
import { Pets, Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import type { Pet } from '../types';

const SPECIES_OPTIONS = ['Dog', 'Cat', 'Bird', 'Fish', 'Rabbit'];
const CATEGORY_OPTIONS = ['Sale', 'Adoption'];

interface PetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (pet: Omit<Pet, 'id'>) => void;
  editingPet?: Pet | null;
}

export default function PetModal({ open, onClose, onSubmit, editingPet }: PetModalProps) {
  const [form, setForm] = useState({
    name: '', species: 'Dog', breed: '', age: 1, price: 0,
    description: '', imageUrl: '', category: 'Sale', available: true,
  });

  useEffect(() => {
    if (editingPet) {
      setForm({
        name: editingPet.name, species: editingPet.species, breed: editingPet.breed,
        age: editingPet.age, price: editingPet.price, description: editingPet.description,
        imageUrl: editingPet.imageUrl, category: editingPet.category, available: editingPet.available,
      });
    } else {
      setForm({ name: '', species: 'Dog', breed: '', age: 1, price: 0,
        description: '', imageUrl: '', category: 'Sale', available: true });
    }
  }, [editingPet, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      slotProps={{ paper: { sx: { borderRadius: 4, overflow: 'hidden' } } }}>
      {/* Header */}
      <Box sx={{ background: 'linear-gradient(135deg, #f97316, #ea580c)', px: 3, py: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}><Pets /></Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
            {editingPet ? 'Edit Pet' : 'Add New Pet'}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>
            {editingPet ? 'Update pet details' : 'Fill in the details to list a pet'}
          </Typography>
        </Box>
        <Button onClick={onClose} sx={{ color: 'white', minWidth: 'auto' }}><Close /></Button>
      </Box>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label="Pet Name" required fullWidth value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField select label="Species" fullWidth value={form.species}
              onChange={e => setForm({ ...form, species: e.target.value })}>
              {SPECIES_OPTIONS.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField label="Breed" required fullWidth value={form.breed}
              onChange={e => setForm({ ...form, breed: e.target.value })} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Age (years)" type="number" fullWidth value={form.age}
              onChange={e => setForm({ ...form, age: Number(e.target.value) })}
              slotProps={{ htmlInput: { min: 0 } }} />
            <TextField label="Price ($)" type="number" fullWidth value={form.price}
              onChange={e => setForm({ ...form, price: Number(e.target.value) })}
              slotProps={{ htmlInput: { min: 0, step: 0.01 } }} />
          </Box>
          <TextField select label="Category" fullWidth value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}>
            {CATEGORY_OPTIONS.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>
          <TextField label="Image URL" fullWidth value={form.imageUrl}
            onChange={e => setForm({ ...form, imageUrl: e.target.value })}
            placeholder="https://images.unsplash.com/..." />
          <TextField label="Description" multiline rows={3} fullWidth value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={onClose} variant="outlined" sx={{ borderRadius: 3 }}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{
            borderRadius: 3, background: 'linear-gradient(135deg, #f97316, #ea580c)', fontWeight: 700,
          }}>
            {editingPet ? 'Save Changes' : 'Add Pet'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
