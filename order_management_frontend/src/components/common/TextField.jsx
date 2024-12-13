import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

const TextField = ({ label, value, onChange, type = 'text', ...props }) => {
  return (
    <MuiTextField
      label={label}
      value={value}
      onChange={onChange}
      type={type}
      fullWidth
      margin="normal"
      {...props}
    />
  );
};

export default TextField;
