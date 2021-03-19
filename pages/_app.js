import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import useFontFamily from "../hooks/useFontFamily";
import useCustomStyle from "../hooks/useCustomStyle";
import useColorGen from "../hooks/useColorGen";
import Header from "../components/General/header";
import AlertMessage from '../components/General/Alert';
import "../styles/main.css"
import '../styles/typography.css';
import '../styles/gastronautPayment.css';

const MyApp = ({ Component, pageProps }) => {
  const { data, restaurantId, resultStatus } = pageProps;

  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [savedOrder, setSavedOrder] = useState({});
  const [language, setLanguage] = useState('de');
  const [preferences, setPreferences] = useState([])
  const [allergens, setAllergens] = useState([])
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const globalRouter = useRouter();


  useEffect(() => {
    // We re-use only the user info that are stored from less than 24 hours
    const timeLimit = Date.now() - 24 * 60 * 60 * 1000;
    const storedInfo = localStorage.getItem('takeAwayuserInfo');
    let initialUserInfo = {};
    if (!!storedInfo) {
      const parsedInfo = JSON.parse(storedInfo);
      if (parsedInfo.timestamp >= timeLimit) {
        initialUserInfo = { ...parsedInfo };
      }
    }

    if (initialUserInfo.userLanguage) {
      setLanguage(initialUserInfo.userLanguage);
    } else {
      const browserLanguage = window.navigator.language;
      setLanguage(browserLanguage.split('-')[0]);
    }

    setUserInfo(initialUserInfo);
  }, [restaurantId]);

    
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('takeAwaycart'));
    const filter = JSON.parse(localStorage.getItem('preferences'));
    const allergenList = JSON.parse(localStorage.getItem('allergens'))
    if (items && filter && allergenList ) {
    setCart(items);
    setPreferences(filter);
    setAllergens(allergenList)
    }
}, []);

useEffect(() => {
    localStorage.setItem('takeAwaycart', JSON.stringify(cart));
    localStorage.setItem('preferences', JSON.stringify(preferences));
    localStorage.setItem('allergens', JSON.stringify(allergens));
}, [cart,preferences,allergens]);

useEffect(() => {
  const initialOrder = localStorage.getItem('takeAwayLastOrder') || {};
  Object.keys(initialOrder).length === 0
    ? setSavedOrder(initialOrder)
    : setSavedOrder(JSON.parse(initialOrder));
}, [restaurantId]);

const handleCookieInfo = cookieInfo => {
  const newInfo = JSON.parse(JSON.stringify(userInfo));
  newInfo.allowCookie = cookieInfo;
  handleUserInfo(newInfo);
};

const handleUserInfo = newInfo => {
  newInfo.timestamp = Date.now();
  setUserInfo(newInfo);
  localStorage.setItem('takeAwayuserInfo', JSON.stringify(newInfo));
};

const handleSavedOrder = newOrder => {
  setSavedOrder(newOrder);
  localStorage.setItem('takeAwayLastOrder', JSON.stringify(newOrder));
};

const handleLanguage = lang => {
  setLanguage(lang);
  const newUserInfo = { ...userInfo, userLanguage: lang };
  handleUserInfo(newUserInfo);
};


  const handleChangeCart = newCart => {
      setCart(newCart);
      localStorage.setItem('takeAwaycart', JSON.stringify(newCart));
    };
  
  const AddToCart = (itemId, qty) =>{
    console.log(itemId)
      let newCart = [...cart];
      let elemFound = newCart.find(cartItem => cartItem.meal.id === itemId.id )
      if(elemFound){
          elemFound.quantity += qty;
      }else{
          newCart.push({meal: itemId, quantity: qty })
      }
      handleChangeCart(newCart)
  }

  const deleteItemFromCart = (itemId) => {
    console.log(itemId)
    const newCart = [];
    cart.map(elem => {
      if (elem.meal.id !== itemId.meal.id) {
        newCart.push(elem);
      }
    });
    handleChangeCart(newCart);
  };

  const decreaseItemFromCart = (itemId) => {
    const newCart = cart
      .map(elem => {
        if (elem.meal.id === itemId.meal.id ) {
          elem.quantity -= 1;
        }
        return elem;
      })
      .filter(elem => elem.quantity > 0);
    handleChangeCart(newCart);
  };

  const increaseItemFromCart = (itemId) => {
    const newCart = cart
      .map(elem => {
        if (elem.meal.id === itemId.meal.id ) {
          elem.quantity += 1;
        }
        return elem;
      })
      .filter(elem => elem.quantity > 0);
    handleChangeCart(newCart);
  };


  // {
  //   "allergens": [
  //           "2"
  //       ],
  //   "cart": [
  //           {"id": "Scc0KUNa4kfXhzoIyanw", "amount": 1
  //           },
  //           {"id": "3701", "options": [], "amount": 1, "price": 5.5
  //           }
  //       ],
  //   "company": "qwertg",
  //   "current": "regular",
  //   "customer": {},
  //   "deliveryPrice": 0,
  //   "deliveryTime": "2021-03-18T12:08",
  //   "email": "efrgt",
  //   "name": "rajath",
  //   "oldOrderTime": null,
  //   "orderMethod": "pickup",
  //   "orderTime": "now",
  //   "paymentMethod": "sepa_debit",
  //   "phone": "werftg",
  //   "preferences": []
  //   }
  const dateHelper = (date = new Date()) => {
    return date.toISOString().split('T')[0];
  };

  const createTimeStamp = (waitingTime = '00:30') => {

    if(!waitingTime) {
      waitingTime = '00:30';
    }
  
    let [hh, mm] = waitingTime.split(':').map(t => parseInt(t));
    
    let addNSec = (hh * 60 + mm) * 60000;
  
    let currentTime = new Date(Date.now() + addNSec).toTimeString().split(':').slice(0,2).join(':');
  
    let date = dateHelper() + 'T' + currentTime;
  
    return date;
  
  }

  const handleConfirmCommand = async ({
    additional,
    paymentOption,
    discount
  }) => {
    const paymentMethods = data.restaurant.paymentMethods;
    const {
      name,
      surname,
      email,
      street = '',
      addressZusatz = '',
      city = '',
      zipCode = '',
      phoneNumber,
      comment,
      company
    } = userInfo;

    // const { voucher, coupon } = discount;

    const { termsChecked } = additional;

    const order = {
      allergens,
      name: `${name} ${surname}`,
      phone:`${phoneNumber}`,
      company,
      email,
      phoneNumber,
      comment,
      address: { street, addressZusatz, zipCode, city },
      cart: cart.map(item => {
        return { id: item.meal.id, amount: item.quantity };
      }),
      orderMethod: 'pickup',
      paymentMethod: paymentOption,
      oldOrderTime: null,
      orderTime:"now",
      preferences
      // voucher: { ...voucher },
      // coupon: { ...coupon }
    };

    const hasGlobalEmptyFields =
      !order.name ||
      !order.email ||
      !order.phone;

    const hasDeliveryEmptyFields =
      !order.address.street || !order.address.zipCode || !order.address.city;

    const hasEmptyFields =
      order.orderMethod === 'delivery'
        ? hasGlobalEmptyFields || hasDeliveryEmptyFields
        : hasGlobalEmptyFields;

    const emailRegex = new RegExp(
      /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
    );
    const validEmail = emailRegex.test(email);

    if (cart.length === 0) {
      setAlert({
        open: true,
        message: 'empty_cart',
        severity: 'error'
      });
    } else if (additional.emptyField.length > 0 || hasEmptyFields) {
      setAlert({
        open: true,
        message: 'required_missing',
        severity: 'error'
      });
    } else if (!validEmail) {
      setAlert({
        open: true,
        message: 'invalid_email',
        severity: 'error'
      });
    } else if (!termsChecked) {
      setAlert({
        open: true,
        message: 'terms_and_conditions',
        severity: 'error'
      });
    } else if (
      !order.paymentMethod ||
      !paymentMethods[order.orderMethod].includes(order.paymentMethod)
    ) {
      setAlert({
        open: true,
        message: 'payment_method_missing',
        severity: 'error'
      });
    } else {
      handleSavedOrder({ ...order, cart });
      const { result, error } = await createPayment(order);
      if (error) {
        setAlert({
          open: true,
          message: error,
          severity: 'error'
        });
      } else if (result.message) {
        setAlert({
          open: true,
          message: result.message,
          severity: 'error'
        });
      } else if (result.error) {
        setAlert({
          open: true,
          message: result.error,
          severity: 'error'
        });
      } else if (result.payableItemId) {
        handleSavedOrder({ ...order, cart, orderNumber: result.payableItemId });
        globalRouter.push(
          `/${restaurantId}/${result.payableItemId}/${order.paymentMethod}`
        );
      } else if (result.success) {
        handleSavedOrder({ ...order, cart, orderNumber: result.payableItemId });
        globalRouter.push(`/${restaurantId}/success`);
      }
    }
    setTimeout(() => setAlert({ ...alert, open: false }), 3000);
  };


  const createPayment = useCallback(
    async (orderToSend = {}) => {
      try {
       let deliveryTime = '';

        if(!orderToSend.orderTime.includes('-')) {
          let waitingTime = data?.restaurant?.currentWaitingTimes[orderToSend.deliveryMethod] || '00:30';
          orderToSend.orderTime = 'now';
          deliveryTime = createTimeStamp(waitingTime);
        } else {
          deliveryTime = orderToSend.orderTime;
        }

        orderToSend.deliveryTime = deliveryTime;
        console.log(orderToSend)
        const res = await fetch(
          `https://api.gastronaut.ai/v02/menues/takeAway/${restaurantId}/createPayment`,
          {
            body: JSON.stringify(orderToSend),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        );
        const result = await res.json();
        if (result.payableItemId)
          setSavedOrder(s => {
            return { ...s, orderNumber: result.payableItemId };
          });
        return { result };

      } catch (error) {
        if (error.response) {
          return { error: error.response.data.message };
        } else {
          return { error: error.message };
        }
      }
    },
    [restaurantId]
  );

  useFontFamily(data?.restaurant?.font);
  const colors = useColorGen(data?.restaurant?.colorPalette);
  useCustomStyle(data?.restaurant?.custom);
  return(<>
    <Header {...{
      cart,
      preferences,
      setPreferences,
      allergens,
      setAllergens,
      data,
      restaurantId,
      deleteItemFromCart,
      increaseItemFromCart,
      decreaseItemFromCart
      }}/>
    <Component {...pageProps} 
      {...{
        cart,
        savedOrder,
        setCart,
        preferences,
        setPreferences,
        handleChangeCart, 
        AddToCart, 
        increaseItemFromCart, 
        decreaseItemFromCart,
        userInfo,
        handleUserInfo,
        language,
        handleLanguage,
        handleConfirmCommand
        }} /> 
      <AlertMessage {...{ alert, setAlert, language }} />
  </>)
}

export default MyApp
