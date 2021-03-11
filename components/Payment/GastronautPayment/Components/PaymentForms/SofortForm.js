import React from 'react';
import { Box, Typography } from '@material-ui/core';

const SofortForm = ({ language = 'de' }) => {
  const styles = {
    height: 24,
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <Box style={styles}>
      <Typography variant="caption" style={{ textAlign: 'center' }}>
        {language === 'de'
          ? 'Wenn Sie mit SOFORT zahlen möchten klicken sie auf bezahlen'
          : 'If you would like to pay with SOFORT just click the submit button'}
      </Typography>
    </Box>
  );
};
export default SofortForm;
