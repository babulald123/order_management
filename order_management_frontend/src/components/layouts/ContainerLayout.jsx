import React from 'react';
import { Container, Typography } from '@mui/material';

const ContainerLayout = ({ title, children }) => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default ContainerLayout;
