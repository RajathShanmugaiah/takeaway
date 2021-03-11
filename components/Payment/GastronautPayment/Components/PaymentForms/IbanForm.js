import { IbanElement } from '@stripe/react-stripe-js';
import React from 'react';

const IbanForm = () => {
  const options = {
    supportedCountries: ['SEPA'],
    style: {
      base: {
        fontSize: '20px',
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  };

  return (
    <>
      <label>
        <IbanElement options={options} />
      </label>
    </>
  );
};
export default IbanForm;
