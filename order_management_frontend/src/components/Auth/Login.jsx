import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
      // navigate('/referral');
      navigate('/restaurants');
    } catch (error) {
      const message = error.response.data
      if (message) {
        setError(message);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <ContainerLayout title="Login">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin} loading={loading}>
        Login
      </Button>
    </ContainerLayout>
  );
};

export default Login;
