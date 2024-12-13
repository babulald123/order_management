import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { signup } from '../../services/api';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    // Check if passwords match
    if (password !== passwordConfirmation) {
      setError('Passwords do not match!');
      return;
    }

    // Reset previous error and start loading state
    setError(null);
    setLoading(true);

    try {
      await signup({ user: { email, password, password_confirmation: passwordConfirmation, name } });
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      const status = error.response.data.status;
      if (status && status.message) {
        setError(status.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
    setLoading(false);
  }
  };


  return (
    <ContainerLayout title="Signup">
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleSignup} loading={loading}>
        Signup
      </Button>
    </ContainerLayout>
  );
};

export default Signup;
