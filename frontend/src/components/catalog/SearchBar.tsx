import { Box, TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Box sx={{ width: { xs: '100%', sm: 300 } }}>
      <TextField
        fullWidth
        placeholder="Search pets..."
        size="small"
        onChange={(e) => onSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#a8a29e' }} />
              </InputAdornment>
            ),
          }
        }}
        sx={{
          bgcolor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          }
        }}
      />
    </Box>
  );
}
