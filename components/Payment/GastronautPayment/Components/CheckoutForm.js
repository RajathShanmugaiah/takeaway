import React, { useState, useMemo } from 'react';
import {
  useElements,
  useStripe,
  CardElement,
  IbanElement
} from '@stripe/react-stripe-js';
import CardForm from './PaymentForms/CardForm';
import IbanForm from './PaymentForms/IbanForm';
import SofortForm from './PaymentForms/SofortForm';
import { submitIfZero } from '../api';
import {
  createPaymentMethodPill,
  stringifyAmount,
  stringifyValidationErrors
} from '../helperFunctions.js';
import { PAYMENT_METHODS } from '../defaults';
import { Box, Button, CircularProgress, Typography } from '@material-ui/core';
import './gastronautPayment.css';
import useTranslations from '../../../../hooks/useTranslations';
import PaymentPageJson from '../../../../config/translations/payment.json';

const translations = {
  de: {
    checkout: 'Jetzt Bezahlen',
    isRequired: ' sind Pflichtfelder'
  },
  en: {
    checkout: 'Pay now',
    isRequired: ' are required Fields'
  }
};

const paymentElements = {
  card: <CardForm />,
  sepa_debit: <IbanForm />,
  sofort: <SofortForm />
};

const CheckoutForm = ({
  clientSecret = null,
  amount,
  currency = 'EUR',
  customer = {},
  paymentMethods = PAYMENT_METHODS,
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  language = 'de',
  return_url = null,
  requiredFields = ['last_name', 'email'],
  payableItemId = null,
  restaurantId = null,
  billingDetails = null
}) => {
  const [loading, setloading] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [selectedPayment, setselectedPayment] = useState(paymentMethods[0]);

  const stripe = useStripe();
  const elements = useElements();

  const translation = useMemo(() => translations[language], [language]);

  const { checkout, isRequired } = useTranslations(
    PaymentPageJson,
    language = JSON.parse(localStorage.userInfo).userLanguage
  );

  const handleSubmit = async event => {
    try {
      event.preventDefault();

      if (loading) return;

      setloading(true);

      if (!stripe || !elements) {
        throw new Error('Missing Stripe Element');
      }

      let {
        name,
        first_name = '',
        last_name,
        email,
        phone = '',
        address = {}
      } = customer;

      let requiredFieldObj = {
        last_name: {
          required: requiredFields.includes('last_name'),
          translation: {
            de: 'Nachname',
            en: 'Last name'
          }
        },
        first_name: {
          required: requiredFields.includes('first_name'),
          translation: {
            de: 'Vorname',
            en: 'First name'
          }
        },
        email: {
          required: requiredFields.includes('email'),
          translation: {
            de: 'Email',
            en: 'Email'
          }
        },
        phone: {
          required: requiredFields.includes('phone'),
          translation: {
            de: 'Telefon',
            en: 'Phone'
          }
        }
      };

      let missingFields = [];

      Object.keys(requiredFieldObj).forEach(key => {
        let value = customer[key];

        if (!value && requiredFieldObj[key].required) {
          missingFields.push(requiredFieldObj[key].translation[language]);
        }
      });

      if (missingFields.length) {
        setValidationError(
          `${missingFields.join(', ')} ${translation.isRequired}`
        );
        setloading(false);
        return;
      } else {
        setValidationError(null);
      }

      if (clientSecret === 'amountIsZero') {
        await submitIfZero({
          name: name ? name : `${first_name} ${last_name}`,
          email,
          phone,
          address,
          payableItemId,
          restaurantId
        });
        onPaymentSuccess({});
        setloading(false);
        return;
      }

      const billing_details = billingDetails
        ? billingDetails
        : {
            name: name ? name : `${first_name} ${last_name}`,
            email: email ? email : null,
            phone: phone ? phone : null,
            address
          };

      if (selectedPayment === 'sofort') {
        const sofortResult = await stripe.confirmSofortPayment(clientSecret, {
          payment_method: {
            sofort: {
              country: 'DE'
            },
            billing_details
          },
          return_url: return_url || window.location.href
        });
        if (sofortResult.error) {
          throw sofortResult.error;
        }

        return;
      }

      const cardElement = elements.getElement(CardElement);
      const ibanElement = elements.getElement(IbanElement);

      const payment = {
        payment_method: {
          ...(selectedPayment === 'card' && { card: cardElement }),
          ...(selectedPayment === 'sepa_debit' && {
            sepa_debit: ibanElement
          }),
          billing_details
        }
      };

      let confirmPayment;

      if (selectedPayment === 'card') {
        confirmPayment = await stripe.confirmCardPayment(clientSecret, payment);
      } else if (selectedPayment === 'sepa_debit') {
        confirmPayment = await stripe.confirmSepaDebitPayment(
          clientSecret,
          payment
        );
      }

      if (confirmPayment.error) throw confirmPayment.error;

      onPaymentSuccess(confirmPayment);
    } catch (error) {
      console.error(error);
      if (error.type !== 'validation_error') {
        onPaymentError(error);
      } else {
        setValidationError(stringifyValidationErrors(error, language));
      }
    }

    setloading(false);

    return;
  };

  if (clientSecret === 'amountIsZero') {
    paymentMethods = [];
  }

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Box className='pillContainer'>
        {paymentMethods.length > 1 &&
          paymentMethods.map(paymentMethodId => {
            let { title, icon = null } = createPaymentMethodPill(
              paymentMethodId
            );

            let selected = selectedPayment === paymentMethodId;

            return (
              <Button
                key={paymentMethodId}
                color={selected ? 'primary' : 'default'}
                disableElevation
                variant='contained'
                startIcon={icon}
                onClick={() => setselectedPayment(paymentMethodId)}
                style={{ marginRight: 10 }}
              >
                {title}
              </Button>
            );
          })}
      </Box>
      <Box>{!!paymentMethods.length && paymentElements[selectedPayment]}</Box>
      <Button
        className='paymentButton'
        type='submit'
        color='primary'
        variant='contained'
        fullWidth
        style={{ marginTop: 20, fontSize: 18 }}
        disabled={loading}
      >
        {!loading ? (
          `${stringifyAmount(amount, currency)} - ${checkout}`
        ) : (
          <CircularProgress size={30} />
        )}
      </Button>
      <Typography variant='caption'>{validationError}</Typography>
    </Box>
  );
};

export default CheckoutForm;
