import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoaderComponent= () => {
  return (
    <Box
      data-testid='bxCirculer'
      sx={{
        height: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoaderComponent;
