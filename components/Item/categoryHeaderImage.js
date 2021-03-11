import React from 'react';
import Link from 'next/link';
import styles from  '../../styles/Item/categoryHeader.module.css';
import ItemCards from './itemCards';

const CategoryIntro = ({
  catimage,
  title,
  description
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

const SubCategoryHeader = ({
  catId,
  subcatTitle,
  subcatImage,
  subcategoryItems,
  cart,
  setCart,
  handleChangeCart,
  AddToCart
}) =>{
  return(<>
    <div className={styles.card}>
      {
        subcatImage
        ?
          <div className={styles.cardImage} style={{backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${subcatImage})`}}>
                    <p className={styles.cardTitle}>{subcatTitle}</p>
          </div>
        :
        ""
      }
    </div>
    <ItemCards catId={catId} categoryItems={subcategoryItems} cart={cart} setCart={setCart} handleChangeCart={handleChangeCart}/>
  </>)
}

const CategoryHeaderImage = ({ categoryData, categoryId, categoryIntro, language = 'de', categoryItems, cart,setCart, handleChangeCart, AddToCart }) => {
  return (<>
        {categoryIntro
          .map(itm => {
            return(<>
                <CategoryIntro catimage={itm.image} title={itm.translations.de.title} description={itm.translations.de.description} />
           </> )
        })}
    <div id={styles.itemCards}>
        {categoryData.length > 0 ?
          categoryData
          .sort((a, b) => a.position - b.position)
          .map(itm => {
            return(<>
                <SubCategoryHeader catId={itm.id} subcategoryItems={categoryItems} subcatImage={itm.image} subcatTitle={itm.translations.de.title} handleChangeCart={handleChangeCart} AddToCart={AddToCart} cart={cart} setCart={setCart}/>
           </> )
        })
        :
        <ItemCards catId={categoryId} categoryItems={categoryItems} cart={cart} handleChangeCart={handleChangeCart} AddToCart={AddToCart} cart={cart} setCart={setCart}/>
        }
    </div>
  </>);
};
export default CategoryHeaderImage;