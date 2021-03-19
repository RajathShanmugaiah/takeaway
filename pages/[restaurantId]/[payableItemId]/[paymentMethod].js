import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslations from '../../../hooks/useTranslations';
import CartPageJson from '../../../config/translations/cartpage.json';
import PaymentPageJson from '../../../config/translations/payment.json';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { ArrowBackRounded } from '@material-ui/icons';

import GastronautPayment from '../../../components/Payment/GastronautPayment';

export async function getServerSideProps(context) {
  const restaurantId = context.query.restaurantId;
  const payableItemId = context.query.payableItemId;
  const paymentMethod = context.query.paymentMethod;
  const res = await fetch(
    `https://api.gastronaut.ai/v02/menues/takeAway/${restaurantId}`
  );
  const data = await res.json();
  return {
    props: {
      data,
      restaurantId,
      payableItemId,
      paymentMethod
    }
  };
}

export default function Payment(props) {
  const router = useRouter();

  const {
    data,
    restaurantId,
    payableItemId,
    paymentMethod,
    userInfo,
    language
  } = props;

  const [isSuccess, setIsSuccess] = useState(false);

  const customer = {
    first_name: userInfo.name,
    last_name: userInfo.surname,
    email: userInfo.email,
    phone: userInfo.phone
  };

  const { checkoutText } = useTranslations(CartPageJson, language);
  const { backText } = useTranslations(PaymentPageJson, language);

  if (isSuccess) {
    router.push(`/${restaurantId}/success`);
  }

  return (
    <div className='page-container'>
      <Head>
        <title>
          {checkoutText} | {data.restaurant.restaurantName || restaurantId}
        </title>
        <meta
          property='og:title'
          content={`${checkoutText} | ${
            data.restaurant.restaurantName || restaurantId
          }`}
          key='og-title'
        />
      </Head>
      <div id='payment-page'>
        <div className='payment-sub-header'>
          {!isSuccess && (
            <IconButton
              size='small'
              onClick={router.goBack}
              style={{ marginRight: 10 }}
              disabled={!!isSuccess}
            >
              <ArrowBackRounded />
            </IconButton>
          )}
          <span>{backText}</span>
        </div>
        <div className='gastronaut-payment-container'>
          <GastronautPayment
            restaurantId={restaurantId}
            payableItemId={payableItemId}
            returnUrl={''}
            language={'de'}
            paymentMethods={[paymentMethod]}
            requiredFields={[]}
            hideCustomerInfo
            hidePurchaseInfo
            onPaymentSuccess={setIsSuccess}
            customer={customer}
          />
        </div>
      </div>
    </div>
  );
}
