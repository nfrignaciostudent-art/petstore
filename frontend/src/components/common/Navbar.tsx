import { AppBar, Toolbar, Typography, Box, Badge, IconButton } from '@mui/material';
import { Pets, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <AppBar position="sticky" sx={{
      background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
      boxShadow: '0 4px 20px rgba(249,115,22,0.3)',
    }}>
      <Toolbar sx={{ gap: 2, maxWidth: 1400, width: '100%', mx: 'auto' }}>
        <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', flex: 1 }}>
          <Pets sx={{ fontSize: 32, mr: 1 }} />
          <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
            Paw<span style={{ fontWeight: 400 }}>Shop</span>
          </Typography>
        </Box>

        <IconButton color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <Badge badgeContent={cartCount} color="error">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
