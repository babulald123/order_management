import React from 'react';
import { Button as MuiButton } from '@mui/material';

const Button = ({ children, onClick, loading, ...props }) => (
  <MuiButton onClick={onClick} disabled={loading} {...props}>
    {loading ? 'Loading...' : children}
  </MuiButton>
);

export default Button;
