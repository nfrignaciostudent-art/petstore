import { Chip, Box } from '@mui/material';

const CATEGORIES = ['All', 'Cats', 'Dogs', 'Fish', 'Birds'];

const categoryIcons: Record<string, string> = {
  All: '🐾', Cats: '🐈', Dogs: '🐕', Birds: '🐦', Fish: '🐠',
};

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {CATEGORIES.map(cat => (
        <Chip
          key={cat}
          label={`${categoryIcons[cat]} ${cat}`}
          onClick={() => onCategoryChange(cat)}
          variant={activeCategory === cat ? 'filled' : 'outlined'}
          color={activeCategory === cat ? 'primary' : 'default'}
          sx={{
            fontWeight: 600, fontSize: '0.85rem', px: 1,
            ...(activeCategory === cat && {
              bgcolor: '#f97316', color: 'white',
              boxShadow: '0 2px 8px rgba(249,115,22,0.4)',
            }),
          }}
        />
      ))}
    </Box>
  );
}
