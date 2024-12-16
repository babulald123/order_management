import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation to /signup
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { login } from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login({ user: { email, password } });
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      const role = data.user.role;
      localStorage.setItem('role', role);
      navigate(`/${role}s`);
    } catch (error) {
      const message = error.response?.data || 'An unexpected error occurred.';
      setError(message);
    }
  };

  return (
    <ContainerLayout title="Login">
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        loading={loading}
        fullWidth
      >
        Login
      </Button>

      {/* Sign Up Link */}
      <Typography variant="body2" align="center" style={{ marginTop: '16px' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ textDecoration: 'none', color: '#1976d2' }}>
          Sign Up
        </Link>
      </Typography>
    </ContainerLayout>
  );
};

export default Login;
