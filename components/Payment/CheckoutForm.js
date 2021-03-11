import React, { useEffect, useState } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Tabs,
  Tab,
  InputAdornment
} from '@material-ui/core';
import useTranslations from '../../hooks/useTranslations';
import CheckOutJson from '../../config/translations/checkout.json';
import CartAccordionMobile from '../Cart/CartAccordionMobile';
import styles from '../../styles/Payment/checkoutForm.module.css';

const tabs = [
    {
      id: 'Delivery',
      fields: [
        {
          name: 'name',
          required: true
        },
        {
          name: 'surname',
          required: true
        },
        {
          name: 'company',
          required: false
        },
        {
          name: 'email',
          required: true
        },
        {
          name: 'street',
          required: true
        },
        {
          name: 'addressZusatz',
          required: false
        },
        {
          name: 'city',
          required: true
        },
        {
          name: 'zipCode',
          required: true
        },
        {
          name: 'phoneNumber',
          required: true
        },
        {
          name: 'comment',
          required: false
        }
      ]
    },
    {
      id: 'Take Away',
      fields: [
        {
          name: 'name',
          required: true
        },
        {
          name: 'surname',
          required: true
        },
        {
          name: 'company',
          required: false
        },
        {
          name: 'email',
          required: true
        },
        {
          name: 'phoneNumber',
          required: true
        },
        {
          name: 'comment',
          required: false
        }
      ]
    }
  ];

const CheckoutUserInfo = ({
    tab,
    userInfo = {},
    handleUserInfo = () => {},
    additional,
    setAdditional,
    checkoutTexts = {}
  }) => {
    const handleChange = e => {
      const { name, value } = e.target;
  
      const newAdditional = JSON.parse(JSON.stringify(additional));
      const newEmpty = newAdditional.emptyField.filter(item => item !== name);
      newAdditional.emptyField = [...newEmpty];
  
      const newInfo = JSON.parse(JSON.stringify(userInfo));
      newInfo[name] = value;
      handleUserInfo(newInfo);
  
      setAdditional(newAdditional);
    };
  
    const handleBlur = e => {
      const { required, name, value } = e.target;
      if (required && !value) {
        const newAdditional = JSON.parse(JSON.stringify(additional));
        newAdditional.emptyField.push(name);
        setAdditional(newAdditional);
      } else {
        const newAdditional = JSON.parse(JSON.stringify(additional));
        const newEmpty = newAdditional.emptyField.filter(item => item !== name);
        newAdditional.emptyField = [...newEmpty];
        setAdditional(newAdditional);
      }
    };
  
    return (
      <form className='checkout-user-info'>
        {tab.fields.map((field, i) => (
          <TextField
            fullWidth
            key={i}
            label={checkoutTexts[field.name]}
            name={field.name}
            required={field.required}
            onChange={handleChange}
            value={userInfo[field.name] || ''}
            onBlur={handleBlur}
            error={additional.emptyField.includes(field.name)}
          />
        ))}
      </form>
    );
  };

const CheckOutForm = ({
    paymentMethods,
    disclaimer = '',
    cart = [],
    restaurantId = '',
    language = 'de',
    deleteItemFromCart = () =>{},
    increaseItemFromCart = () =>{},
    decreaseItemFromCart =() =>{},
    userInfo = {}
}) =>{
    const checkoutTexts = useTranslations(CheckOutJson, language);
    const {
      paymentMethodText,
      couponCodeText,
      voucherCodeText,
      hereByConfirmText,
      termsAndConditionsText,
      voucherOrCouponText,
      orderNowText,
      applyText
    } = checkoutTexts;

    const [paymentOption, setPaymentOption] = useState('');
    const [additional, setAdditional] = useState({
      voucherId: '',
      couponId: '',
      termsChecked: false,
      emptyField: []
    });

    
  const totalPrice =
  cart.length > 0
    ? cart.reduce((acc, item) => item.meal.price * item.quantity + acc, 0)
    : 0;

const discountAmount = 0;

const totalPriceDiscounted = totalPrice - discountAmount;

const totalProducts = cart.reduce((acc, item) => item.quantity + acc, 0);

    return(
        <div className={styles.checkoutContainer} >
                <h5>Customer Information</h5>
                  <CheckoutUserInfo
                        tab={tabs.find(tab => tab.id === 'Take Away')}
                        {...{
                        userInfo,
                        additional,
                        setAdditional,
                        checkoutTexts
                        }}
                    />

                <div style={{ marginTop: 30 }}>
                        <h5>{paymentMethodText}</h5>
                        <div className={styles.paymentCardContainer}>
                        {
                            paymentMethods.pickup.map((payment, i) =>(
                              
                            <div
                            key={i}
                            onClick={() => setPaymentOption(payment)}
                            className={
                                paymentOption === payment
                                ? `${styles.paymentCard} ${styles.selected}`
                                : `${styles.paymentCard}`
                            }
                            >
                            <img src={`/paymentMethods/${payment}.png`} alt={payment} />
                            <span label={checkoutTexts[payment]}>
                                {checkoutTexts[payment]}
                            </span>
                            </div>
                        ))}
                        </div>
                </div>

                <div style={{ marginTop: 30 }}>
                  <h5 className={styles.voucherOrCouponTitle}>{voucherOrCouponText}</h5>
                  <div className={styles.discountInput}>
                    <TextField
                      fullWidth
                      label={voucherCodeText}
                      value={additional.voucherId}
                      onChange={e =>
                        setAdditional(a => ({ ...a, voucherId: e.target.value }))
                      }
                    />
                    <button
                      onClick={() => handleVoucher(additional.voucherId)}
                      disabled={!additional.voucherId}
                    >
                      {applyText}
                    </button>
                  </div>
                  <div className={styles.discountInput}>
                    <TextField
                      fullWidth
                      label={couponCodeText}
                      value={additional.couponId}
                      onChange={e =>
                        setAdditional(a => {
                          return { ...a, couponId: e.target.value };
                        })
                      }
                    />
                    <button
                      onClick={() => handleCoupon(additional.couponId)}
                      disabled={!additional.couponId}
                    >
                      {applyText}
                    </button>
                  </div>
            </div>

            <div style={{ marginTop: 40 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={additional.termsChecked}
                    onChange={() => {
                      setAdditional({
                        ...additional,
                        termsChecked: !additional.termsChecked
                      });
                    }}
                    name='terms'
                    color='primary'
                  />
                }
                label={
                  <span>
                    {hereByConfirmText}{' '}
                    <a target='_blank' href={`/${restaurantId}/terms-conditions`}>
                      {termsAndConditionsText}
                    </a>
                  </span>
                }
              />
              <button className={`${styles.orderBtn} hidden-mobile`} >
                {orderNowText} €
                {(totalPriceDiscounted / 100).toFixed(2).replace('.', ',')}
              </button>
          </div>
        </div>
    )
}
export default CheckOutForm