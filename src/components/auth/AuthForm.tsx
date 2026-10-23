import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { signIn, signUp } from '../../services/auth';

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isSignUp = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const authFunction = isSignUp ? signUp : signIn;
    const { error: authError } = await authFunction(email, password);
    
    if (authError) {
      setError(authError.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        {isSignUp ? 'Create Account' : 'Sign In'}
      </Typography>
      
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      {error && <Typography color="error">{error}</Typography>}
      
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </Button>
    </Box>
  );
};

export default AuthForm;