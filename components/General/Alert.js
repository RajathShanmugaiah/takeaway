import React from 'react';
import { IconButton, Collapse } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import useTranslations from '../../hooks/useTranslations';
import AlertJson from '../../config/translations/alertmessages.json';

const AlertMessage = ({ alert, setAlert, language = 'de' }) => {
  const alertText = useTranslations(AlertJson, language);

  let message = alert.message;
  if (alert.message?.includes('//')) {
    const messageFirstPart = alertText[alert.message.split('//')[0]];
    const messageSecondPart = alert.message.split('//')[1];
    message = messageFirstPart + ' ' + messageSecondPart;
  }
  if (alertText[alert.message]) {
    message = alertText[alert.message];
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100vw',
        zIndex: 1000
      }}
    >
      <Collapse in={alert.open}>
        <Alert
          severity={alert.severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setAlert({ open: false, message: '', severity: 'error' });
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          }
        >
          <AlertTitle style={{ textTransform: 'capitalize' }}>
            {alertText[alert.severity]}
          </AlertTitle>
          {message}
        </Alert>
      </Collapse>
    </div>
  );
};

export default AlertMessage;
