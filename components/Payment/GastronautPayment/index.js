/* eslint-disable */
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { getClientSecret } from './api';
import { Box } from '@material-ui/core';
import {
  DefaultPurchaseInformation,
  Loading,
  ErrorMessage,
  CheckoutForm,
  DefaultCustomerInformationForm,
  SuccessMessage
} from './Components';
import styles from './Components/gastronautPayment.css';
import { PAYMENT_METHODS, STRIPE_KEY } from './defaults';
// import { ApiContext } from '../Contexts/ApiContext';
import { useRouter } from 'next/router';

const errorTranslations = {
  de: {
    missing_stripe_credentials:
      'Auf der Seite des Restaurants ist ein Fehler aufgetreten',
    payable_item_not_found:
      'Beim erstellen Ihrer Bestellung ist ein Fehler aufgetreten.',
    payable_item_paid: 'Ihre Bestellung wurde bereits bezahlt'
  },
  en: {
    missing_stripe_credentials:
      'An error occured on the site of the restaurant',
    payable_item_not_found: 'An error occured when creating your order',
    payable_item_paid: 'Your order has allready been paid.'
  }
};

const stringifyErrorMessage = (err, lang = 'de') => {
  let translation = errorTranslations[lang][err];

  if (translation) return translation;

  return err;
};

const GastronautPayment = ({
  restaurantId = null,
  payableItemId = null,
  paymentMethods = PAYMENT_METHODS,
  containerProps = {},
  PurchaseInformation = DefaultPurchaseInformation,
  hidePurchaseInfo = false,
  CustomerInformationForm = DefaultCustomerInformationForm,
  hideCustomerInfo = false,
  language = 'de',
  customer: defaultCustomer = {},
  onPaymentSuccess = () => {},
  onPaymentError = () => {},
  returnUrl: return_url = null,
  requiredFields = ['last_name', 'email']
}) => {
  const [billing_details, setbilling_details] = useState(null);
  const [stripeAccount, setstripeAccount] = useState(false);
  const [success, setsuccess] = useState();
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(true);
  const [payableItem, setpayableItem] = useState({});
  const [clientSecret, setclientSecret] = useState(null);
  const [customer, setcustomer] = useState(defaultCustomer);

  // const { setstate } = useContext(ApiContext)

  const router = useRouter();

  const paymentIntent = router.query.payment_intent;

  const redirectStatus = router.query.redirect_status;

  useEffect(() => {
    setloading(true);

    getClientSecret({
      restaurantId,
      payableItemId,
      paymentMethods,
      paymentIntent,
      redirectStatus
    })
      .then(({ data }) => {
        console.log('xxx', data);
        if (data.error === 'payable_item_paid') {
          setsuccess(data.paymentIntent);
          onPaymentSuccess(data.paymentIntent);
          // setstate(st => ({ ...st, custom: data.custom }));
        } else {
          // setstate(st => ({ ...st, custom: data.custom }));
          setclientSecret(data.clientSecret);
          if (data.accountType !== 'express') {
            setstripeAccount(data.stripeAccount);
          } else {
            setstripeAccount('express');
          }
          setpayableItem(data.payableItem);
          setbilling_details(data.billing_details);
        }
      })
      .catch(({ message, response }) => {
        if (!response) {
          seterror(stringifyErrorMessage(message, language));
        } else {
          seterror(stringifyErrorMessage(response.data.message, language));
        }
      })
      .finally(() => setloading(false));
  }, [restaurantId, payableItemId]);

  const stripePromise = useMemo(() => {
    if (!stripeAccount || stripeAccount === 'express') {
      return loadStripe(STRIPE_KEY);
    } else {
      return loadStripe(STRIPE_KEY, { stripeAccount });
    }
  }, [stripeAccount]);

  if (success) {
    return <SuccessMessage paymentIntent={success} language={language} />;
  }

  return (
    <Box {...containerProps} className='container'>
      {loading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {!loading && stripeAccount !== false && !error && (
        <Box className='formContainer'>
          {!hideCustomerInfo && (
            <CustomerInformationForm {...{ customer, setcustomer, language }} />
          )}
          <Elements stripe={stripePromise}>
            <CheckoutForm
              clientSecret={clientSecret}
              amount={payableItem.amount}
              payableItemId={payableItemId}
              restaurantId={restaurantId}
              currency={payableItem.currency}
              customer={customer}
              paymentMethods={paymentMethods}
              language={language}
              billingDetails={billing_details}
              requiredFields={requiredFields}
              onPaymentSuccess={({ paymentIntent = {} }) => {
                setsuccess(paymentIntent);
                onPaymentSuccess(paymentIntent);
              }}
              onPaymentError={error => {
                seterror(error.message);
                onPaymentError(error);
              }}
              return_url={return_url}
            />
          </Elements>
        </Box>
      )}
      {!loading && !hidePurchaseInfo && payableItem && !error && (
        <PurchaseInformation {...payableItem} language={language} />
      )}
    </Box>
  );
};

export default GastronautPayment;
