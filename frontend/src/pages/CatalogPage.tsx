import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, CircularProgress } from '@mui/material';
import { Pets } from '@mui/icons-material';
import { petsApi } from '../api/petsApi';
import type { PetSummary } from '../api/petsApi';
import PetCard from '../components/catalog/PetCard';
import CategoryFilter from '../components/catalog/CategoryFilter';
import SearchBar from '../components/catalog/SearchBar';

const CatalogPage = () => {
  const [pets, setPets] = useState<PetSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await petsApi.getAll(category, search);
        setPets(data);
      } catch (error) {
        console.error('Failed to load pets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, [category, search]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />
        <SearchBar onSearch={setSearch} />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress sx={{ color: '#f97316' }} size={50} />
        </Box>
      ) : pets.length === 0 ? (
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
          {pets.map((pet, i) => (
            <Grid key={pet.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <PetCard pet={pet} index={i} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default CatalogPage;
