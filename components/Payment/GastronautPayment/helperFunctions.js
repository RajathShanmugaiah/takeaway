import React from 'react';

import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import CreditCardIcon from '@material-ui/icons/CreditCard';

const stringifyAmount = (amount, currency) => {
  let macro = Math.floor(amount / 100);

  let micro = amount % 100;

  if (micro < 10) {
    micro = '0' + micro;
  }

  if (currency === 'EUR') {
    return `${macro},${micro}€`;
  } else if (currency === 'USD') {
    return `$${macro}.${micro}`;
  } else {
    return `${macro},${micro}${currency}`;
  }
};

const pMTranslations = {
  de: {
    sepa_debit: 'SEPA Lastschrift',
    card: 'Kredit Karte',
    sofort: 'SOFORT'
  },
  en: {
    sepa_debit: 'SEPA',
    card: 'Credit Card',
    sofort: 'SOFORT'
  }
};

const createPaymentMethodPill = (id, lang = 'de') => {
  let title = pMTranslations[lang][id];

  if (id === 'sepa_debit') {
    return { title, icon: <AccountBalanceIcon size="small" /> };
  } else if (id === 'card') {
    return { title, icon: <CreditCardIcon /> };
  } else if (id === 'sofort') {
    return { title, icon: null };
  } else {
    return {};
  }
};

const stringifyValidationErrors = ({ code, message = '' }, lang = 'de') => {
  if (lang === 'en') return message;

  const translations = {
    de: {
      incomplete_iban: 'IBAN ist nicht komplett',
      invalid_iban: 'IBAN ist fehlerhaft',
      incomplete_number: 'Kredit Karten Nummer ist fehlerhaft',
      incomplete_expiry: 'Ablaufdatum Ihrer Karte ist fehlerhaft',
      incomplete_cvc:
        'Der Security Code ihrer Karte fehlt, dieser befindet sich auf der Rückseite Ihrer Karte',
      invalid_expiry_year_past: 'Ihre Karte ist abgelaufen'
    }
  };

  let translation = translations[lang][code];

  if (translation) return translation;

  return message;
};

export { stringifyAmount, createPaymentMethodPill, stringifyValidationErrors };
