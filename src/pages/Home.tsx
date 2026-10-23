import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SwayStay
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sustainable Travel Planning
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button 
          component={Link} 
          to="/login" 
          variant="contained" 
          size="large" 
          sx={{ mr: 2 }}
        >
          Login
        </Button>
        <Button 
          component={Link} 
          to="/signup" 
          variant="outlined" 
          size="large"
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Home;