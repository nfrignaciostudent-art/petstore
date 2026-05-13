import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import Navbar from './components/common/Navbar';
import CatalogPage from './pages/CatalogPage';
import PetDetailPage from './pages/PetDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ minHeight: '100vh', bgcolor: '#faf5f0' }}>
        <Navbar />
        
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

        <Routes>
          <Route path="/" element={<CatalogPage />} />
          <Route path="/pet/:id" element={<PetDetailPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
