import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from  '../../styles/General/filter.module.css';
import {
    Typography
  } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import VeganModal from '../../config/icons/veganModal';
import VegetarianModal from '../../config/icons/vegetarianModal';
import AlkoholModal from '../../config/icons/alchoholModal';


const FoodTypes = ({
    item,
    preferences,
    setPreferences
}) =>{
    let newPrefernce = null;
    const toggleChecked = ({ target: { checked } }) => {
      if(checked)
      {
        if(item === "vegetarian")
          newPrefernce = setPreferences([...preferences,item,"vegan"])
        else
          newPrefernce = setPreferences([...preferences,item])
        localStorage.setItem('preferences', JSON.stringify(newPrefernce));
      }
      else
      {
        if(item === "vegetarian")
          newPrefernce = preferences.filter(p => ( (p !== item) && ( p !== "vegan" )) );
        else if(item === "vegan" && preferences.includes("vegetarian"))
          newPrefernce = preferences.filter(p => ( (p !== item) && (p !== "vegetarian") ));
        else
          newPrefernce = preferences.filter(p => p !== item );
        setPreferences(newPrefernce)
        localStorage.setItem('preferences', JSON.stringify(preferences));
      }
    };

    return(
        <div className={styles.footerSettingsHeader}>
                <div className={styles.allergenelementContainer}>
                    {
                        item === "vegan"?
                            (<VeganModal />)
                        :
                            item === "vegetarian"?
                            (<VegetarianModal />)
                        :
                            (<AlkoholModal />)
                    }
                    <Typography style={{textTransform:"capitalize"}} >{item}</Typography>
                    <Switch checked={preferences.includes(item)} onChange={toggleChecked} name={item} />
                </div>
        </div>
    )
  }
  export default FoodTypes