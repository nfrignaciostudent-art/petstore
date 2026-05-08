import { AppBar, Toolbar, Typography, Button, InputBase, Box, Badge } from '@mui/material';
import { Search, Add, Pets, ShoppingCart } from '@mui/icons-material';
import { useState } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onAddNew: () => void;
  cartCount: number;
}

export default function Navbar({ onSearch, onAddNew, cartCount }: NavbarProps) {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch(query);
  };

  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
    }}>
      <Toolbar sx={{ gap: 2, maxWidth: 1400, width: '100%', mx: 'auto' }}>
        <Pets sx={{ fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5, mr: 2 }}>
          Paw<span style={{ fontWeight: 400 }}>Shop</span>
        </Typography>

        <Box sx={{
          flex: 1, display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.2)',
          borderRadius: 3, px: 2, py: 0.5, maxWidth: 500, backdropFilter: 'blur(10px)',
        }}>
          <Search sx={{ mr: 1, opacity: 0.8 }} />
          <InputBase
            placeholder="Search pets, breeds..."
            value={query}
            onChange={e => { setQuery(e.target.value); if (!e.target.value) onSearch(''); }}
            onKeyDown={handleKeyDown}
            sx={{ flex: 1, color: 'white', '& ::placeholder': { color: 'rgba(255,255,255,0.7)' } }}
            fullWidth
          />
        </Box>

        <Badge badgeContent={cartCount} color="error" sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <ShoppingCart />
        </Badge>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddNew}
          sx={{
            bgcolor: 'white', color: '#ea580c', fontWeight: 700,
            '&:hover': { bgcolor: '#fff7ed', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' },
          }}
        >
          Add Pet
        </Button>
      </Toolbar>
    </AppBar>
  );
}
