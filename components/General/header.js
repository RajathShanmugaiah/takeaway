
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from  '../../styles/General/header.module.css';
import {
    IconButton,
    Popover,
    Menu,
    MenuItem,
    TextField
  } from '@material-ui/core';

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import SmallCart from '../Cart/SmallCart';

const availableLanguages = ['de', 'en', 'fr'];

const DesktopActionButtons = ({
    setAnchorEl,
    setAnchorLang,
    setAnchorSearch,
    language,
    cart
  }) => {
    return (
      <div className={styles.actionButtonsDesktop}>
        <IconButton>
            <SettingsRoundedIcon />
        </IconButton>
        <IconButton
          onClick={e => setAnchorLang(e.currentTarget)}
          className={styles.languageflag}
        >
        <Image
          src={`/Flags/${language}.svg`}
          alt={language}
          width={30}
          height={30}
        />
        </IconButton>
        <IconButton
          onClick={e => setAnchorEl(e.currentTarget)}
          className={styles.notificationContainer}
        >
          <ShoppingCartOutlinedIcon fontSize='large' />
          <div className={styles.notification}>
            {cart.reduce((acc, item) => item.quantity + acc, 0)}
          </div>
        </IconButton>
      </div>
    );
  };
  
  const MobileActionButtons = ({
    restaurantId,
    setAnchorLang,
    language
  }) => {
    return (
      <div className={styles.actionButtonsMobile}>
          <IconButton>
            <SettingsRoundedIcon />
        </IconButton>
        <IconButton
          onClick={e => setAnchorLang(e.currentTarget)}
          className={styles.languageflag}
        >
            <Image
                src={`/Flags/${language}.svg`}
                alt={language}
                width={30}
                height={30}
            />
        </IconButton>
        <Link href={`/${restaurantId}/cart`} passHref>
          <IconButton className={styles.notificationContainer}>
            <ShoppingCartOutlinedIcon />
            <div className='notification'>
              <div></div>
            </div>
          </IconButton>
        </Link>
      </div>
    );
  };

const Header = ({
    restaurantId,
    language = 'de',
    cart,
    data,
    handleLanguage =() =>{},
    deleteItemFromCart = () =>{},
    decreaseItemFromCart = () =>{},
    increaseItemFromCart = () =>{}
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorLang, setAnchorLang] = useState(null);
    const [anchorSearch, setAnchorSearch] = useState(null);

    return (
      <>
        <header id={styles.header}>
          <nav className={`${styles.headerElem} ${styles.headernavContainer}`}>

          </nav>
          <div className={styles.headerElem}>
            <img
                src={data.restaurant.logo}
                className={styles.logo}
                alt='logo'
                height={90}
            />
          </div>
  
          <div className={styles.headerElem}>
            <DesktopActionButtons
                {...{ setAnchorEl, setAnchorLang, setAnchorSearch, language, cart }}
            />
            <MobileActionButtons
                {...{ restaurantId, setAnchorLang, language }}
            />
          </div>
        </header>

        <Popover
        id={Boolean(anchorEl) ? 'cart-popover' : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <SmallCart
          isPopover={true}
          onClose={() => setAnchorEl(null)}
          {...{
            restaurantId,
            cart,
            language,
            deleteItemFromCart,
            increaseItemFromCart,
            decreaseItemFromCart
          }}
        />
      </Popover>


        <Popover
        id={Boolean(anchorLang) ? 'lang-popover' : undefined}
        open={Boolean(anchorLang)}
        anchorEl={anchorLang}
        onClose={() => setAnchorLang(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <div className={styles.languagelistPopover}>
          {availableLanguages.map((lang, i) => (
            <IconButton
              onClick={() => {
                setAnchorLang(null);
                handleLanguage(lang);
              }}
              style={language === lang ? { display: 'none' } : {}}
              key={'lang' + i}
            >
              <Image
                src={`/Flags/${lang}.svg`}
                alt={lang}
                width={30}
                height={30}
              />
            </IconButton>
          ))}
        </div>
      </Popover>

      </>
    );
  };
  
  export default Header;
  