import React from 'react';
import Link from 'next/link';
import styles from  '../../styles/General/heroImage.module.css';

const HeroImage = ({ slides = null, image = null, language = 'de' }) => {
  return (
    <div id={styles.heroSlider}>
      {!!image && (
        <div className={styles.oneImageSlide}>
          <img src={image ? image : restaurantlogo} />
        </div>
      )}
    </div>
  );
};
export default HeroImage;
