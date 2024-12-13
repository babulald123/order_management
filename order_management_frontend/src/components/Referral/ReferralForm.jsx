import React, { useState } from 'react';
import TextField from '../common/TextField';
import Button from '../common/Button';
import ContainerLayout from '../layouts/ContainerLayout';
import Typography from '@mui/material/Typography';
import { sendReferral } from '../../services/api';


const ReferralForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      debugger 
      await sendReferral({ email },token);
      alert(`Referral email sent to ${email}`);
      setEmail('');
    } catch (error) {
      debugger
      setError(error.response?.data?.error || error.response?.data || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ContainerLayout title="Send Referral">
      <form onSubmit={handleSubmit}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" loading={loading}>
          Send Referral
        </Button>
      </form>
    </ContainerLayout>
  );
};

export default ReferralForm;
