import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from  '../../styles/General/filter.module.css';
import {
    IconButton,
    Popover,
    Menu,
    MenuItem,
    TextField,
    Typography
  } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

const AllergenElement = ({
  id = '',
  iconLeft = null,
  title = '',
  value,
  onChange = () => {}
}) => {

  return (
    <div key={id} className={styles.allergenelementContainer}>
        <Typography>{title}</Typography>
        <Switch checked={value} onChange={onChange} name={id} />
    </div>
  );
};

  const Filter = ({
    allergen,
    allergens,
    setAllergens
}) =>{
    let newAllergen = null;
    const toggleChecked = ({ target: { checked } }) => {
      if(checked)
      {
        newAllergen = setAllergens([...allergens,allergen.id])
        localStorage.setItem('allergens', JSON.stringify(newAllergen));
      }
      else
      {
        newAllergen = allergens.filter(p => p !== allergen.id);
        setAllergens(newAllergen)
        localStorage.setItem('allergens', JSON.stringify(allergens));
      }
    };

    return(
        <div className={styles.footerSettingsHeader} key={allergen.id} >
                <AllergenElement id={allergen.id} title={allergen.translations.de.title} value={allergens.includes(allergen.id)} onChange={toggleChecked} />
        </div>
    )
  }
  export default Filter