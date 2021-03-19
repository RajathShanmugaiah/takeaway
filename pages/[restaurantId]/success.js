import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import useTranslations from '../../hooks/useTranslations';
import SuccessPageJson from '../../config/translations/successpage.json';

import SuccessPage from '../../components/Payment/SuccessPage';

export async function getServerSideProps(context) {
    const restaurantId = context.query.restaurantId;
    const res = await fetch(
        `https://api.gastronaut.ai/v02/menues/takeAway/${restaurantId}`
      );
      const data = await res.json();
      
      return {
        props: {
          data,
          restaurantId
        }
    }
}

export default function Success(props) {
  const router = useRouter();
  const {
    data,
    restaurantId,
    savedOrder,
    handleChangeCart,
    language,
  } = props;

  useEffect(() => {
    handleChangeCart([]);
  }, [restaurantId]);

  const { thankyouText } = useTranslations(SuccessPageJson, language);


  return (
    <div className='page-container'>
      <Head>
        <title>
          {thankyouText} | {data.restaurant.restaurantName || restaurantId}
        </title>
        <meta
          property='og:title'
          content={`${thankyouText} | ${
            data.restaurant.restaurantName || restaurantId
          }`}
          key='og-title'
        />
      </Head>
      <SuccessPage {...{ restaurantId, savedOrder, language }} />
    </div>
  );
}
