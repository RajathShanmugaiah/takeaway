import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography
} from '@material-ui/core';
import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';
import Link from 'next/link';
import useTranslations from '../../hooks/useTranslations';
import CartPageJson from '../../config/translations/cartpage.json';
import styles from '../../styles/Cart/CartAccordionMobile.module.css';

const CartAccordionMobile = ({
  totalPrice = 0,
  totalProducts = 0,
  restaurantId = '',
  onValidateCommand = () => {},
  onCheckout = false,
  discount,
  language = 'de'
}) => {
  const [expanded, setExpanded] = useState(false);
  const {
    deliveryText,
    totalCostText,
    totalProductsText,
    checkoutText,
    freeText
  } = useTranslations(CartPageJson, language);

  return (
    <div className={styles.cartAccordion}>
      <Accordion expanded={expanded}>
        <AccordionSummary
          aria-controls='checkout-panel'
          id='checkout-panel'
          className={styles.accordionHeader}
        >
          <div className={styles.expandIcon} onClick={() => setExpanded(!expanded)}>
            {expanded ? (
              <ExpandMoreRounded fontSize='large' />
            ) : (
              <ExpandLessRounded fontSize='large' />
            )}
          </div>
          {!expanded && (
            <div className={styles.closedHeader}>
              <div>
                <div className={styles.totalPrice}>
                  €{(totalPrice).toFixed(2).replace('.', ',')}
                </div>
              </div>
              <div>
                {!onCheckout && (
                  <Link href={`/${restaurantId}/checkout`} passHref>
                    <button className={styles.btnMobileCheckout}>
                      {checkoutText}
                    </button>
                  </Link>
                )}
                {onCheckout && (
                  <button
                    className={styles.btnMobileCheckout}
                    onClick={onValidateCommand}
                  >
                    {checkoutText}
                  </button>
                )}
              </div>
            </div>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {expanded && (
            <div className={expanded ? `${styles.accordionBody}` : ''}>
              <div className={expanded ? `${styles.accordionBodyLine}` : ''}>
                <div>{totalProductsText}:</div>
                <div>{totalProducts}</div>
              </div>
              {/* {discount.coupon && (
                <div className={expanded ? `${accordionBodyLine} ${first}` : ''}>
                  <div>{discount.coupon.id} :</div>
                  <div>
                    -{discount.coupon.amount}
                    {discount.coupon.type === 'percentage' ? '%' : '€'}
                  </div>
                </div>
              )} */}
              <div
                className={expanded ? `${styles.accordionBodyLine}` : ''}
                style={{ borderBottom: 'none' }}
              >
                <div>{totalCostText} :</div>
                <div>€{(totalPrice).toFixed(2).replace('.', ',')}</div>
              </div>
              <div className={expanded ? `${styles.cartBtn} ${styles.second}` : ''}>
                {!onCheckout && (
                  <Link href={`/${restaurantId}/checkout`} passHref>
                    <button className={styles.bigCheckoutBtn}>{checkoutText}</button>
                  </Link>
                )}
                {onCheckout && (
                  <button
                    onClick={onValidateCommand}
                    className={styles.bigCheckoutBtn}
                  >
                    {checkoutText}
                  </button>
                )}
              </div>
            </div>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CartAccordionMobile;
