import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { signup } from '../../services/api';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('user');
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
      const response = await signup({ user: { email, password, password_confirmation: passwordConfirmation, name, role } });
      const data = response.data;
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('role', data.role);
      navigate(`/${role}s`);
      // navigate('/restaurants'); // Redirect to a restaurant page after successful signup
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

      {/* Name Input */}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} />

      {/* Role Selection (Dropdown) */}
      <FormControl fullWidth>
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)} // Update the role state
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="restaurant">Restaurant</MenuItem>
          <MenuItem value="driver">Driver</MenuItem>
        </Select>
      </FormControl>

      {/* Email Input */}
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

      {/* Password Input */}
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Password Input */}
      <TextField
        label="Confirm Password"
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />

      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleSignup} loading={loading}>
        Signup
      </Button>
    </ContainerLayout>
  );
};

export default Signup;
