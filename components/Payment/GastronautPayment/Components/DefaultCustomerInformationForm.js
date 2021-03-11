import React, { useMemo } from 'react';
import { Grid, TextField } from '@material-ui/core';

const translations = {
  de: {
    labels: {
      first_name: 'Vorname',
      last_name: 'Nachname',
      email: 'Email',
      phone: 'Telefon'
    }
  },
  en: {
    labels: {
      first_name: 'First Name',
      last_name: 'Last Name',
      email: 'Email',
      phone: 'Phone'
    }
  }
};

const DefaultCustomerInformationForm = ({
  customer = {},
  setcustomer,
  language = 'de',
  includeAddress = false
}) => {
  const handleChange = e => {
    let { name, value } = e.target;

    setcustomer({ ...customer, [name]: value });
  };

  const translation = useMemo(() => translations[language], [language]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={translation.labels.first_name}
          name="first_name"
          value={customer.first_name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={translation.labels.last_name}
          name="last_name"
          value={customer.last_name}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={translation.labels.email}
          name="email"
          value={customer.email}
          onChange={handleChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label={translation.labels.phone}
          name="phone"
          value={customer.phone}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default DefaultCustomerInformationForm;
