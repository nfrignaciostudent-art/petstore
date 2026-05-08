import { useState, useEffect, useCallback } from 'react';
import { Container, Grid, Box, Typography, Snackbar, Alert, CircularProgress, Fab } from '@mui/material';
import { Add, Pets } from '@mui/icons-material';
import type { Pet } from './types';
import { petApi } from './api';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import PetCard from './components/PetCard';
import PetModal from './components/PetModal';

function App() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [filtered, setFiltered] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [species, setSpecies] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; msg: string; severity: 'success' | 'error' }>({ open: false, msg: '', severity: 'success' });

  const fetchPets = useCallback(async () => {
    setLoading(true);
    try {
      const data = await petApi.getAll();
      setPets(data);
    } catch {
      setError('Failed to load pets');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPets(); }, [fetchPets]);

  useEffect(() => {
    let result = pets;
    if (species !== 'All') result = result.filter(p => p.species === species);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) || p.species.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'age': return a.age - b.age;
        default: return a.name.localeCompare(b.name);
      }
    });
    setFiltered(result);
  }, [pets, species, sortBy, searchQuery]);

  const handleSearch = (q: string) => { setSearchQuery(q); };

  const handleSubmit = async (petData: Omit<Pet, 'id'>) => {
    try {
      if (editingPet?.id) {
        await petApi.update(editingPet.id, petData);
        setSnackbar({ open: true, msg: 'Pet updated!', severity: 'success' });
      } else {
        await petApi.create(petData);
        setSnackbar({ open: true, msg: 'Pet added!', severity: 'success' });
      }
      setEditingPet(null);
      fetchPets();
    } catch {
      setSnackbar({ open: true, msg: 'Failed to save pet', severity: 'error' });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this pet?')) return;
    try {
      await petApi.delete(id);
      setSnackbar({ open: true, msg: 'Pet removed', severity: 'success' });
      fetchPets();
    } catch {
      setSnackbar({ open: true, msg: 'Failed to delete', severity: 'error' });
    }
  };

  const handleEdit = (pet: Pet) => { setEditingPet(pet); setModalOpen(true); };
  const handleAddToCart = (pet: Pet) => {
    setCartCount(c => c + 1);
    setSnackbar({ open: true, msg: `${pet.name} added to cart!`, severity: 'success' });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#faf5f0' }}>
      <Navbar onSearch={handleSearch} onAddNew={() => { setEditingPet(null); setModalOpen(true); }} cartCount={cartCount} />

      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 50%, #fce7f3 100%)',
        py: { xs: 4, md: 6 }, px: 3, textAlign: 'center',
        borderBottom: '1px solid #fed7aa',
      }}>
        <Typography variant="h3" sx={{ fontWeight: 800, color: '#292524', mb: 1, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
          Find Your Perfect <span style={{ color: '#f97316' }}>Companion</span> 🐾
        </Typography>
        <Typography variant="body1" sx={{ color: '#78716c', maxWidth: 600, mx: 'auto' }}>
          Browse our collection of adorable pets ready to join your family.
        </Typography>
      </Box>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <FilterBar
          activeSpecies={species} onSpeciesChange={setSpecies}
          sortBy={sortBy} onSortChange={setSortBy}
          totalCount={filtered.length}
        />

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }} onClose={() => setError(null)}>{error}</Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: '#f97316' }} size={50} />
          </Box>
        ) : filtered.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Pets sx={{ fontSize: 80, color: '#d6d3d1', mb: 2 }} />
            <Typography variant="h5" sx={{ color: '#78716c', fontWeight: 700, mb: 1 }}>
              No pets found
            </Typography>
            <Typography variant="body2" sx={{ color: '#a8a29e', mb: 3 }}>
              Try a different search or filter
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {filtered.map((pet, i) => (
              <Grid key={pet.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <PetCard pet={pet} onEdit={handleEdit} onDelete={handleDelete} onAddToCart={handleAddToCart} index={i} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* FAB */}
      <Fab
        color="primary"
        onClick={() => { setEditingPet(null); setModalOpen(true); }}
        sx={{
          position: 'fixed', bottom: 24, right: 24,
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          boxShadow: '0 4px 20px rgba(249,115,22,0.4)',
          '&:hover': { background: 'linear-gradient(135deg, #fb923c, #f97316)' },
          display: { md: 'none' },
        }}
      >
        <Add />
      </Fab>

      {/* Modal */}
      <PetModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingPet(null); }}
        onSubmit={handleSubmit} editingPet={editingPet} />

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 3, fontWeight: 600 }}>
          {snackbar.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
