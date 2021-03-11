import React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

import styles from '../Components/gastronautPayment.css';

const Loading = () => {
  return (
    <Box className='loading'>
      <CircularProgress />
    </Box>
  );
};

export default Loading;
