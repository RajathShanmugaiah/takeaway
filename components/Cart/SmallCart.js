import React, { useState, useEffect, useRef } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import CartAccordionMobile from './CartAccordionMobile';
import Link from "next/link"
import styles from "../../styles/Cart/smallCart.module.css"


const CartItem = ({
  item,
  i,
  restaurantId,
  language,
  deleteItemFromCart = () =>{},
  increaseItemFromCart = () =>{},
  decreaseItemFromCart =() =>{}
}) => {


  return (
    <div className={styles.productCard} key={i}>
      <div
        className={styles.deleteBtn} onClick={() => deleteItemFromCart(item)}
      >
        <DeleteRoundedIcon />
      </div>      
      <div className={styles.itemInfo}>
        <div className={styles.itemTitle}> <div className={styles.itemQty}>{item.quantity}</div> X {item.meal.translations.de.title}</div>
      </div>
      <div className={styles.itemPrice}>
        <div style={{textAlign:"center"}}>
        €
        {((+item.meal.price * item.quantity))
          .toFixed(2)
          .replace('.', ',')}
        </div>

        <div className={styles.quantityBtn}>
          <button onClick={() => decreaseItemFromCart(item)}>
            -
          </button>
          <button onClick={() => increaseItemFromCart(item)}>
            +
          </button>
        </div>
      </div>
      
    </div>
  );
};

const SmallCart = ({
  isPopover = false,
  restaurantId = '',
  cart = [],
  onClose = () => {},
  language='de',
  discount=0,
  deleteItemFromCart = () =>{},
  increaseItemFromCart = () =>{},
  decreaseItemFromCart =() =>{}
}) => {
  const {
    cartText,
    totalProductsText,
    totalCostText,
    deliveryText,
    summaryText,
    viewCartText,
    noItemsText,
    orText,
    checkoutText,
    freeText
  } = useTranslations(CartPageJson, language);

  const discountAmount = discount

  const totalProducts =
  cart.length > 0 ? cart.reduce((acc, item) => acc + item.quantity, 0) : 0;
const totalPrice =
  cart.length > 0
    ? cart.reduce((acc, item) => item.meal.price * item.quantity + acc, 0)
    : 0;
    const totalPriceDiscounted =
    totalPrice -
    discountAmount;
  return(
      <div className={styles.cartContainer}>
          {isPopover && (
            <IconButton
              onClick={onClose}
              aria-label='close'
              style={{ position: 'absolute', top: '5px', right: '5px' }}
            >
              <CloseRoundedIcon />
            </IconButton>
          )}
            <div className={`${styles.cartHeader} hidden-mobile`}>
              <h5>{cartText}</h5>
              <h5 className={styles.cartTitle}>
                {totalProductsText} :
                <span style={{ float: 'right' }}>{totalProducts}</span>
              </h5>

              <h5>{summaryText} :</h5>
            </div>
            {cart.length === 0 && (
              <div className={styles.marginMobileItem}>
                <h6>{noItemsText}...</h6>
              </div>
            )}
            {cart.map((item, i) => (
              <CartItem
                key={i}
                {...{
                  item,
                  i,
                  restaurantId,
                  language,
                  deleteItemFromCart,
                  increaseItemFromCart,
                  decreaseItemFromCart
                }}
              />
            ))}


        <div className={`${styles.cartFooter} hidden-mobile`}>
              <Link href={`/${restaurantId}/cart`} passHref>
                <button className={styles.btnCart} onClick={onClose}>
                  {viewCartText.charAt(0).toUpperCase() +
                    viewCartText.slice(1).toLowerCase()}
                </button>
              </Link>

                <div className={styles.btnSplit}>
                  <div className={styles.splitLine}></div>
                  <div>{orText}</div>
                  <div className={styles.splitLine}></div>
                </div>

              <Link href={`/${restaurantId}/checkout`} passHref>
                <button className={styles.btnCart}>{checkoutText}</button>
              </Link>

          </div>

          <h5 className={`${styles.totalCart} hidden-mobile`}>
            {totalCostText} :
            <span style={{ float: 'right' }}>
              €{(totalPriceDiscounted).toFixed(2).replace('.', ',')}
            </span>
        </h5>
          <div className='hidden-desktop'>
            <CartAccordionMobile
              totalPrice={totalPriceDiscounted}
              {...{
                restaurantId,
                totalProducts,
                discount,
                language
              }}
            />
        </div>       
      </div>
  )
};

export default SmallCart;
