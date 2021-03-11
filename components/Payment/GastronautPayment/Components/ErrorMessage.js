import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import './gastronautPayment.css';
import ErrorIcon from '@material-ui/icons/Error';

const translations = {
  de: {
    header:
      'Es ist ein Fehler aufgetreten wodurch keine Zahlung getätigt werden konnte',
    tryLater:
      'Bitte versuchen sie es zu einem späteren Zeitpunkt erneut oder benutzen Sie eine andere Zahlungsmethode'
  },
  en: {
    header: 'An error occurred.',
    tryLater:
      'Please try it again at a later moment or provide a different payment method'
  }
};

const ErrorMessage = ({ error = '', language = 'de' }) => {
  const translation = useMemo(() => translations[language], [language]);

  return (
    <Box className='errorContainer'>
      <ErrorIcon color='primary' />
      <Typography variant='h4'>{translation.header}</Typography>
      <Typography variant='body1'>{error}</Typography>
      <Typography variant='body1'>{translation.tryLater}</Typography>
    </Box>
  );
};

export default ErrorMessage;
