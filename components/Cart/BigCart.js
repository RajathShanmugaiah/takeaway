import React, { useEffect, useState, useRef } from 'react';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { IconButton, TextField } from '@material-ui/core';
import Link from 'next/link';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import styles from '../../styles/Cart/bigCart.module.css';

const ItemRow = ({
  restaurantId,
  item,
  i,
  increaseItemFromCart,
  decreaseItemFromCart,
  deleteItemFromCart,
  language = 'de'
}) => {
  const [imageRatio, setImageRatio] = useState();
  const imgRef = useRef(null);
  function onLoad() {
    setImageRatio(imgRef.current.naturalHeight / imgRef.current.naturalWidth);
  }
  useEffect(() => {
    if (imgRef.current?.complete) {
      onLoad();
    }
  }, []);

  return (
    <tr key={i} className={styles.tableRow}>
      <td>
        <div className={styles.marginTopTableContainer}>
          <IconButton onClick={() => deleteItemFromCart(item)}>
            <DeleteRoundedIcon />
          </IconButton>
        </div>
      </td>
      <td colSpan='2' className={styles.itemDescription}>
        <h5 style={{display:"flex"}}><div>{item.quantity}</div> X {item.meal.translations.de.title}</h5>
        <div className={styles.itemDescriptionText}>
          {item.meal.translations.description}
        </div>
        {/* <div className='item-option'>
          {!!item.option ? item.product.optionName : ''}
        </div> */}
        <div className='item-availability'>
        </div>
      </td>
      <td className={styles.marginTopTableContainer}>
        <div className={styles.quantityBtn}>
          <button style={{border: "1px solid black"}} onClick={() => decreaseItemFromCart(item)}>
            -
          </button>
          <button style={{border: "1px solid black"}} onClick={() => increaseItemFromCart(item)}>
            +
          </button>
        </div>
      </td>
      <td>
        <div className={styles.marginTopTableContainer}>
          €{(+item.meal.price).toFixed(2).replace('.', ',')}
        </div>
      </td>
      <td>
        <div className={styles.marginTopTableContainer}>
          €
          {((+item.meal.price * item.quantity))
            .toFixed(2)
            .replace('.', ',')}
        </div>
      </td>
    </tr>
  );
};

const BigCart = ({
  restaurantId = '',
  cart = [],
  language = 'de',
  deleteItemFromCart = () => {},
  decreaseItemFromCart = () => {},
  increaseItemFromCart = () => {}
}) => {
  const {
    myCartText,
    amountText,
    priceText,
    totalText,
    noItemsText,
    voucerText,
    continueOrderText
  } = useTranslations(CartPageJson, language);
  return (
    <div className={`${styles.bigCartContainer} big-cart-container`}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.tableHeader}>
            <th className={styles.deleteHeader}></th>
            <th colSpan='2' className={styles.mycartTitle}>
              {myCartText}
            </th>
            <th>{amountText}</th>
            <th>{priceText}</th>
            <th>{totalText}</th>
          </tr>
        </thead>
        <tbody>
          {cart.length === 0 && (
            <tr className={styles.tableRow}>
              <td colSpan='6'>
                <h6>{noItemsText}</h6>
              </td>
            </tr>
          )}
          {cart.map((item, i) => (
            <ItemRow
              {...{
                item,
                i,
                increaseItemFromCart,
                decreaseItemFromCart,
                deleteItemFromCart,
                restaurantId,
                language
              }}
            />
          ))}
        </tbody>
      </table>
      {/* <div style={{ marginTop: 40, borderTop: '1px solid darkgray' }}>
        <h5 style={{ marginTop: 20 }}>{voucherText} ?</h5>
        <div style={{ width: '40%' }}>
          <TextField fullWidth label='Voucher Code' />
        </div>
        <div style={{ width: '40%' }}>
          <TextField fullWidth label='Coupon Code' />
        </div>
      </div> */}
      <Link href={`/${restaurantId}/products`} passHref scroll={false}>
        <a style={{ display: 'flex', marginTop: 30 }}>
          <IconButton>
            <ArrowBackRoundedIcon />
          </IconButton>
          <span>
            <h6 style={{ marginTop: '9%' }}>{continueOrderText}</h6>
          </span>
        </a>
      </Link>
    </div>
  );
};

export default BigCart;
