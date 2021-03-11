import React, { useMemo } from 'react';
import { Box, Typography } from '@material-ui/core';
import './gastronautPayment.css';
import { stringifyAmount } from '../helperFunctions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import useTranslations from '../../../../hooks/useTranslations';
import PaymentPageJson from '../../../../config/translations/payment.json';

const translations = {
  de: {
    header: 'Ihre Zahlung war Erfolgreich',
    description: 'werden in den nächsten Tagen von Ihrem Konto abgebucht.',
    disclaimerSEPA:
      'Bitte sorgen sie für eine ausreichende Deckung Ihres Bankakkounts anderen falls wird Ihre Zahlung storniert.',
    payable_item_paid: 'Ihre Zahlung war Erfolgreich'
  },
  en: {
    header: 'Your payment was successful',
    description: 'will get booked from your bank account within the next days.',
    disclaimerSEPA:
      'Please ensure that you have sufficient funds in your bank account, otherwise your payment will be canceled.',
    payable_item_paid: 'Your payment was successful'
  }
};

const SuccessMessage = ({ paymentIntent = {}, language = 'de' }) => {
  const {
    amount = 0,
    status = 'succeeded',
    currency = 'eur',
    message = null
  } = paymentIntent;

  const isCardPayment = status !== 'processing';

  const translation = useMemo(() => translations[language], [language]);

  const { header, description, disclaimerSEPA, payable_item_paid  } = useTranslations(
    PaymentPageJson,
    language = JSON.parse(localStorage.userInfo).userLanguage
  );

  return (
    <Box className='successContainer'>
      <CheckCircleIcon color='primary' />
      <Typography variant='h4'>
        {message ? translation[message] : header}
      </Typography>
      {!message && (
        <Typography variant='body1'>
          {stringifyAmount(amount, currency.toUpperCase())}{' '}
          {description}{' '}
          {!isCardPayment && disclaimerSEPA}
        </Typography>
      )}
    </Box>
  );
};

export default SuccessMessage;
