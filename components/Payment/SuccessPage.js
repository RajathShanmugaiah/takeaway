import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import GetAppRoundedIcon from '@material-ui/icons/GetAppRounded';
import PrintRoundedIcon from '@material-ui/icons/PrintRounded';
import { IconButton } from '@material-ui/core';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import styles from '../../styles/Payment/success.module.css';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import SuccessPageJson from '../../config/translations/successpage.json';

const CartProducts = ({ item }) => {
  return (
    <div className={styles.cartProductContainer}>
      <div className={styles.cartProductTitle}>
        {item.product ? item.product.title : 'ProductTitle'}
      </div>
      <div>{item.quantity}</div>
      <div>
        €
        {item.options
          ? (item.options.price / 100).toFixed(2).replace('.', ',')
          : (item.product.price / 100).toFixed(2).replace('.', ',')}
      </div>
      <div>
        €
        {((item.product.price / 100) * item.quantity)
          .toFixed(2)
          .replace('.', ',')}
      </div>
    </div>
  );
};

const SuccessPage = ({ restaurantId, savedOrder, language = 'de'}) => {
  console.log(savedOrder);
  // const {
  //   cart,
  //   customer,
  //   address,
  //   paymentMethod,
  //   orderMethod,
  //   orderNumber,
  //   coupon,
  //   voucher
  // } = savedOrder;
  // const date = new Date().toISOString().slice(0, 10);
  // const TodayDate = date.split('-').reverse().join('-');

  // const pricesArray = cart.map(item => {
  //   if (!item.option) {
  //     return item.product.price * item.quantity;
  //   } else {
  //     return item.option.price * item.quantity;
  //   }
  // });
  // const subTotal = pricesArray.reduce((a, item) => item + a, 0);

  // let discountAmount = 0;
  // if (coupon?.id) {
  //   coupon.type === 'percentage'
  //     ? (discountAmount += (subTotal * coupon.amount) / 100)
  //     : (discountAmount += coupon.amount);
  // }

  // const totalPrice = subTotal + (shippingCost > 0 && activeTab !== 'Take Away' ? shippingCost : 0) - discountAmount;

  const { amountText, priceText, deliveryText, totalText } = useTranslations(
    CartPageJson,
    language
  );
  const {
    thankYouText,
    productNameText,
    subTotalText,
    orderInfoText,
    orderDate,
    nameText,
    shippingText,
    paymentText,
    orderText,
    continueText
  } = useTranslations(SuccessPageJson, language);

  return (
    <>
      {/* <div className={styles.successIconContainer} onLoad={() => calculteShipping()}>
        <div className={styles.successIcon}>
          <div className={styles.successIcon__tip}></div>
          <div className={styles.successIcon__long}></div>
        </div>

        <h3>{thankYouText}</h3>
      </div>
      <div className={styles.successPaymentContainer}>
        <div className={ `${styles.cartProductContainer}` `${firstLine}`}>
          <div className={tyles.cartProductTitle}>{productNameText}</div>
          <div>{amountText}</div>
          <div>{priceText}</div>
          <div>{totalText}</div>
        </div>

        <div>
          {cart.map(item => {
            return <CartProducts item={item} />;
          })}
        </div>

        <div className={styles.successTotalPrice}>
          <div className={styles.successPriceEmptyPart}></div>
          <div className={styles.successPriceFullPart}>
            <div className={styles.successPriceOneLine}>
              <h6>{subTotalText} :</h6>
              <div>€{(subTotal / 100).toFixed(2).replace('.', ',')}</div>
            </div>
            <div className={styles.successPriceOneLine}>
              <h6>{deliveryText} :</h6>
              <div>
                {!shippingCost
                ? freeText
                : `€ ${(shippingCost / 100).toFixed(2).replace('.', ',')}`}
              </div>
            </div>
            {coupon?.id && (
              <div className={styles.successPriceOneLine}>
                <h6>COUPON :</h6>
                <div>
                  - {coupon.amount}
                  {coupon.type === 'percentage' ? '%' : '€'}{' '}
                </div>
              </div>
            )}
            <div className={styles.successPriceOneLine}>
              <h6>{totalText} :</h6>
              <div>€{(totalPrice / 100).toFixed(2).replace('.', ',')}</div>
            </div>
          </div>
        </div>
        <div className={styles.successOrderDate}>
          <h6>{orderInfoText}</h6>
          <div>
            {orderDate} : {TodayDate}
          </div>
        </div>
        <div className={styles.successCustomerInfo}>
          <div>
            <h6>{nameText}</h6>
            <div>{customer && customer.name}</div>
          </div>
          <div>
            <h6>{shippingText}</h6>
            <div>
              {address && address.street} {address && address.addressZusatz}{' '}
              {address && address.zipCode} {address && address.city}
            </div>
          </div>
          <div>
            <h6>{paymentText}</h6>
            <div>{paymentMethod}</div>
          </div>
          <div>
            <h6>{orderText}</h6>
            <div>#{orderNumber}</div>
          </div>
        </div>
      </div>
      <div className={styles.successLinks}>
        <div>
          <Link href={`/${restaurantId}/products`} passHref>
            <a className={styles.successContinueShopping}>
              <ArrowBackRoundedIcon />
              <h6>{continueText}</h6>
            </a>
          </Link>
        </div>
        <div>
          <IconButton>
            <GetAppRoundedIcon />
          </IconButton>
          <span className={styles.successPrintIcon}>
            <IconButton>
              <PrintRoundedIcon />
            </IconButton>
          </span>
        </div>
      </div> */}
    </>
  );
};
export default SuccessPage;
