import { Chip, Box, Typography, FormControl, Select, MenuItem, type SelectChangeEvent } from '@mui/material';
import { Pets, FilterList } from '@mui/icons-material';

const SPECIES = ['All', 'Dog', 'Cat', 'Bird', 'Fish', 'Rabbit'];

const speciesIcons: Record<string, string> = {
  All: '🐾', Dog: '🐕', Cat: '🐈', Bird: '🐦', Fish: '🐠', Rabbit: '🐇',
};

interface FilterBarProps {
  activeSpecies: string;
  onSpeciesChange: (species: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export default function FilterBar({ activeSpecies, onSpeciesChange, sortBy, onSortChange, totalCount }: FilterBarProps) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2, py: 2, px: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
        <Pets sx={{ color: '#f97316', fontSize: 20 }} />
        <Typography variant="body2" sx={{ fontWeight: 700, color: '#78716c' }}>
          {totalCount} pets available
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
        {SPECIES.map(species => (
          <Chip
            key={species}
            label={`${speciesIcons[species]} ${species}`}
            onClick={() => onSpeciesChange(species)}
            variant={activeSpecies === species ? 'filled' : 'outlined'}
            color={activeSpecies === species ? 'primary' : 'default'}
            sx={{
              fontWeight: 600, fontSize: '0.85rem', px: 1,
              ...(activeSpecies === species && {
                bgcolor: '#f97316', color: 'white',
                boxShadow: '0 2px 8px rgba(249,115,22,0.4)',
              }),
            }}
          />
        ))}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterList sx={{ color: '#78716c', fontSize: 20 }} />
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <Select
            value={sortBy}
            onChange={(e: SelectChangeEvent) => onSortChange(e.target.value)}
            sx={{ borderRadius: 3, fontSize: '0.85rem' }}
          >
            <MenuItem value="name">Name A-Z</MenuItem>
            <MenuItem value="price-low">Price: Low to High</MenuItem>
            <MenuItem value="price-high">Price: High to Low</MenuItem>
            <MenuItem value="age">Age: Youngest</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
