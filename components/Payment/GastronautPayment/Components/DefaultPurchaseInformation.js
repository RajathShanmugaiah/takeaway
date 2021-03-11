import React, { useMemo } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  Typography,
  Paper
} from '@material-ui/core';
import { stringifyAmount } from '../helperFunctions';
import './gastronautPayment.css';

const translations = {
  de: {
    total: 'Summe',
    includingVAT: '(inkl. MwSt)',
    disclaimer: ''
  },
  en: {
    total: 'Total',
    includingVAT: '(incl. VAT)',
    disclaimer: ''
  }
};

const DefaultPurchaseInformation = ({
  amount,
  currency = 'EUR',
  products = [],
  language = 'de'
}) => {
  const localizeElement = (element, maxLength = null) => {
    let str = '';

    if (typeof element === 'object') {
      str = element[language] ? element[language] : element.de;
    } else {
      str = element;
    }

    if (!maxLength) return str;

    return str.length > 100 ? `${str.slice(0, maxLength)}...` : str;
  };

  const translation = useMemo(() => translations[language], [language]);

  return (
    <Box className='purchaseInfo'>
      <Paper style={{ padding: 10, flexGrow: 1 }} variant='outlined'>
        <List>
          {products.map(
            ({
              title = '',
              description = '',
              amount: count = 0,
              image = null,
              price = 0,
              id
            }) => (
              <ListItem
                key={id}
                style={{ padding: '10px 0', alignItems: 'baseline' }}
              >
                {image && (
                  <ListItemAvatar>
                    <Avatar src={image} />
                  </ListItemAvatar>
                )}
                <ListItemText
                  style={{ maxWidth: 'calc(100% - 65px)' }}
                  primary={localizeElement(title)}
                  secondary={localizeElement(description, 100)}
                />
                <ListItemText
                  primary={stringifyAmount(count * price, currency)}
                  secondary={id !== 'gastronaut' && `${count}x`}
                  className='itemRight'
                />
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingTop: 5
          }}
        >
          <Box>
            <Typography variant='h6'>{translation.total}</Typography>
            <Typography variant='caption'>
              {translation.includingVAT}
            </Typography>
          </Box>
          <Typography variant='h6'>
            {stringifyAmount(amount, currency)}
          </Typography>
        </Box>
        <Typography variant='caption'>{translation.disclaimer}</Typography>
      </Paper>
    </Box>
  );
};

export default DefaultPurchaseInformation;
