import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, CircularProgress, Card, Grid } from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import { petsApi } from '../api/petsApi';
import type { PetDetail } from '../api/petsApi';

const PetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pet, setPet] = useState<PetDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      try {
        const data = await petsApi.getById(parseInt(id, 10));
        setPet(data);
      } catch (error) {
        console.error('Failed to fetch pet', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <CircularProgress sx={{ color: '#f97316' }} />
      </Box>
    );
  }

  if (!pet) {
    return (
      <Container sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h5">Pet not found</Typography>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Catalog
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} component={Link} to="/" sx={{ mb: 3, color: '#78716c' }}>
        Back to Catalog
      </Button>
      
      <Card sx={{ borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Grid container>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              component="img"
              src={pet.imageUrl || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop'}
              alt={pet.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: { xs: 300, md: 500 } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ p: { xs: 3, md: 5 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#292524' }}>
                  {pet.name}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#f97316' }}>
                  ${pet.price}
                </Typography>
              </Box>
              
              <Typography variant="h6" sx={{ color: '#78716c', mb: 3, fontWeight: 500 }}>
                {pet.breed} · {pet.age} {pet.age === 1 ? 'year' : 'years'} old
              </Typography>
              
              <Typography variant="body1" sx={{ color: '#57534e', lineHeight: 1.8, mb: 4, flex: 1 }}>
                {pet.description}
              </Typography>
              
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                fullWidth
                sx={{
                  py: 1.5,
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  fontWeight: 700, fontSize: '1.1rem',
                  borderRadius: 2,
                  boxShadow: '0 8px 20px rgba(249,115,22,0.3)',
                  '&:hover': { background: 'linear-gradient(135deg, #fb923c, #f97316)' }
                }}
                onClick={() => alert('Added to cart!')}
              >
                Adopt {pet.name}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default PetDetailPage;
