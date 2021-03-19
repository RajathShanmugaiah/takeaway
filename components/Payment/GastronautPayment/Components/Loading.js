import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const Loading = () => {
  return (
    <Box className='loading'>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
