import { Card, CardMedia, CardContent, CardActions, Typography, Button, Chip, IconButton, Box } from '@mui/material';
import { Favorite, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PetSummary } from '../../api/petsApi';

const categoryColors: Record<string, string> = {
  DOGS: '#3b82f6', CATS: '#a855f7', BIRDS: '#10b981', FISH: '#06b6d4'
};

interface PetCardProps {
  pet: PetSummary;
  index: number;
}

export default function PetCard({ pet, index }: PetCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="pet-card-hover fade-in-up" sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'visible' }}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Chip
        label={pet.category}
        size="small"
        sx={{
          position: 'absolute', top: 12, left: 12, zIndex: 2, fontWeight: 700, fontSize: '0.7rem',
          bgcolor: categoryColors[pet.category] || '#6b7280', color: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        }}
      />

      <IconButton
        onClick={() => setLiked(!liked)}
        sx={{
          position: 'absolute', top: 8, right: 8, zIndex: 2,
          bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
          '&:hover': { bgcolor: 'white' },
        }}
        size="small"
      >
        <Favorite sx={{ fontSize: 18, color: liked ? '#ef4444' : '#d1d5db' }} />
      </IconButton>

      <CardMedia
        component="img"
        height="220"
        image={pet.imageUrl || 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop'}
        alt={pet.name}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.3 }}>
            {pet.name}
          </Typography>
          <Typography variant="h6" sx={{
            fontWeight: 800, color: '#f97316', fontSize: '1.1rem',
            bgcolor: '#fff7ed', px: 1.5, py: 0.25, borderRadius: 2,
          }}>
            ${pet.price}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ color: '#78716c', fontWeight: 500, mb: 0.5 }}>
          {pet.breed}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          component={Link}
          to={`/pet/${pet.id}`}
          variant="contained"
          startIcon={<Visibility />}
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #f97316, #ea580c)',
            fontWeight: 700, fontSize: '0.8rem',
            '&:hover': { background: 'linear-gradient(135deg, #fb923c, #f97316)' },
          }}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}
