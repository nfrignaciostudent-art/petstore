import { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Badge, IconButton, Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, Button, Divider } from '@mui/material';
import { Pets, ShoppingCart, Close, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { cartCount, cart, removeFromCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  const cartTotal = cart.reduce((total, pet) => total + pet.price, 0);

  return (
    <>
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

          <IconButton color="inherit" onClick={() => setCartOpen(true)} sx={{ display: { xs: 'flex' } }}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Box sx={{ width: { xs: '100vw', sm: 400 }, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#292524' }}>
              Your Cart
            </Typography>
            <IconButton onClick={() => setCartOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {cart.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10, flex: 1 }}>
              <ShoppingCart sx={{ fontSize: 60, color: '#d6d3d1', mb: 2 }} />
              <Typography variant="h6" sx={{ color: '#78716c' }}>Your cart is empty</Typography>
            </Box>
          ) : (
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {cart.map((pet) => (
                <ListItem key={pet.id} sx={{ px: 0, py: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={pet.imageUrl} variant="rounded" sx={{ width: 60, height: 60, mr: 2 }} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography sx={{ fontWeight: 700, color: '#292524' }}>{pet.name}</Typography>}
                    secondary={`${pet.breed} • $${pet.price}`}
                  />
                  <IconButton color="error" size="small" onClick={() => removeFromCart(pet.id)}>
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}

          {cart.length > 0 && (
            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Total:</Typography>
                <Typography variant="h6" sx={{ fontWeight: 800, color: '#f97316' }}>${cartTotal}</Typography>
              </Box>
              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  background: 'linear-gradient(135deg, #f97316, #ea580c)',
                  py: 1.5, fontWeight: 700,
                  '&:hover': { background: 'linear-gradient(135deg, #fb923c, #f97316)' }
                }}
                onClick={() => {
                  alert(`Checkout successful! Total: $${cartTotal}`);
                  setCartOpen(false);
                }}
              >
                Checkout Now
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
}
