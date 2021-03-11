import { useRouter } from 'next/router';
import Head from 'next/head';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import SmallCart from '../../components/Cart/SmallCart';
import BigCart from '../../components/Cart/BigCart';


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
    language
  } = props;

  const { myCartText } = useTranslations(CartPageJson, language);


  return (
    <div className='page-container'>
      <Head>

      </Head>
      <div id='cart-page'>
        <BigCart
            {...{
                restaurantId,
                cart,
                deleteItemFromCart,
                increaseItemFromCart,
                decreaseItemFromCart,
                userInfo,
                discount,
                language
            }}
            />
        <div className='smallcart-container'>
          <SmallCart
            {...{cart, data, restaurantId, increaseItemFromCart, decreaseItemFromCart, deleteItemFromCart }}
          />
        </div>
      </div>
    </div>
  );
}
