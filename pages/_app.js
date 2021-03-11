import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState, useEffect, useCallback } from 'react';
import useFontFamily from "../hooks/useFontFamily";
import useCustomStyle from "../hooks/useCustomStyle";
import useColorGen from "../hooks/useColorGen";
import Header from "../components/General/header";
import "../styles/main.css"
import '../styles/typography.css';

const MyApp = ({ Component, pageProps }) => {
  const { data, restaurantId, resultStatus } = pageProps;

  const [cart, setCart] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [savedOrder, setSavedOrder] = useState({});
  const [language, setLanguage] = useState('de');

  const globalRouter = useRouter();


  useEffect(() => {
    // We re-use only the user info that are stored from less than 24 hours
    const timeLimit = Date.now() - 24 * 60 * 60 * 1000;
    const storedInfo = localStorage.getItem('userInfo');
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
    const items = JSON.parse(localStorage.getItem('cart'));
    if (items) {
    setCart(items);
    }
}, []);

useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
}, [cart]);

const handleCookieInfo = cookieInfo => {
  const newInfo = JSON.parse(JSON.stringify(userInfo));
  newInfo.allowCookie = cookieInfo;
  handleUserInfo(newInfo);
};

const handleUserInfo = newInfo => {
  newInfo.timestamp = Date.now();
  setUserInfo(newInfo);
  localStorage.setItem('userInfo', JSON.stringify(newInfo));
};

const handleSavedOrder = newOrder => {
  setSavedOrder(newOrder);
  localStorage.setItem('lastOrder', JSON.stringify(newOrder));
};

const handleLanguage = lang => {
  setLanguage(lang);
  const newUserInfo = { ...userInfo, userLanguage: lang };
  handleUserInfo(newUserInfo);
};

  const handleChangeCart = newCart => {
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    };
  
  const AddToCart = (itemId, qty) =>{
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

  useFontFamily(data?.restaurant?.font);
  const colors = useColorGen(data?.restaurant?.colorPalette);
  useCustomStyle(data?.restaurant?.custom);
  return(<>
    <Header {...{cart, data, restaurantId, deleteItemFromCart, increaseItemFromCart, decreaseItemFromCart}}/>
    <Component {...pageProps} 
      {...{
        cart,
        setCart,
        handleChangeCart, 
        AddToCart, 
        increaseItemFromCart, 
        decreaseItemFromCart,
        userInfo,
        handleUserInfo,
        language,
        handleLanguage
        }} /> 
  </>)
}

export default MyApp
