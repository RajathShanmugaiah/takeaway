import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import SmallCart from '../../components/Cart/SmallCart';
import BigCart from '../../components/Cart/BigCart';
import CheckoutForm from '../../components/Payment/CheckoutForm'


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

export default function Cart(props) {
  const router = useRouter();

  const {
    data,
    restaurantId,
    cart,
    increaseItemFromCart,
    decreaseItemFromCart,
    deleteItemFromCart,
    userInfo,
    discount,
    language,
    handleUserInfo,
    handleConfirmCommand
  } = props;

  const { myCartText } = useTranslations(CartPageJson, language);


  return (
    <div className='page-container'>
      <Head>
      </Head>
      <div id='checkout-page'>
        <CheckoutForm
          paymentMethods={data.restaurant.paymentMethods}
          {...{
            data,
            cart,
            restaurantId,
            userInfo,
            language,
            handleUserInfo,
            discount,
            handleConfirmCommand
          }}
        />
        <div className='hidden-mobile'>
          <SmallCart
             {...{cart, data, restaurantId, increaseItemFromCart, decreaseItemFromCart, deleteItemFromCart }}
          />
        </div>
      </div>
    </div>
  );
}
