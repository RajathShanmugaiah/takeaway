import React from 'react';
import Link from 'next/link';
import styles from  '../../styles/Item/categoryHeader.module.css';

const CategoryIntro = ({
    catimage,
    title,
    description,
  
  }) =>{
    return(<>
      <div className={styles.categoryHeaderContainer}>
        <img className={styles.categoryImg} src={catimage}/>
      <div>
        <h3 style={{fontWeight: "700",fontSize: "2rem",marginBlockStart:"0.5rem",marginBlockEnd:"0.5rem"}}>{title}</h3>
        <p dangerouslySetInnerHTML={{__html: description}}></p>
      </div>
    </div>
      
    </>)
  }
  export default CategoryIntro