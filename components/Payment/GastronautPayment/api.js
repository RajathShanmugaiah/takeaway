import axios from 'axios';

// Production
let server = axios.create({
  baseURL: 'https://api.gastronaut.ai/v02/payableItems/',
  timeout: 5000,
  headers: { 'X-Origin': 'merchandise' }
});

// Dev
// let server = axios.create({
//   baseURL: 'http://localhost:8000/v02/payableItems/',
//   timeout: 5000,
//   headers: { 'X-Origin': 'merchandise' }
// });

const getPayableItem = async ({ restaurantId, payableItemId }) => {
  return server.get(`${restaurantId}/${payableItemId}`);
};

const getClientSecret = async ({
  restaurantId,
  payableItemId,
  paymentMethods = [],
  options = {},
  paymentIntent = null,
  redirectStatus = null
}) => {
  if (redirectStatus === 'failed') throw new Error('Payment failed');

  if (!restaurantId || !payableItemId) throw new Error('Missing Credentials');

  options = {
    ...options,
    paymentIntent,
    payment_method_types: paymentMethods
  };

  return server.post(`${restaurantId}/${payableItemId}/paymentIntent`, options);
};

const submitIfZero = async data => {
  return server.post(
    `${data.restaurantId}/${data.payableItemId}/amountIsZero`,
    data
  );
};

const handleCreditCardStep1 = async ({
  restaurantId,
  payableItemId,
  paymentMethod
}) =>
  server.post(`${restaurantId}/${payableItemId}/handleCreditCardStep1`, {
    paymentMethod
  });

export default server;

export { getPayableItem, getClientSecret, submitIfZero, handleCreditCardStep1 };
