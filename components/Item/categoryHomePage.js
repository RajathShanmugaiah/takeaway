import React from 'react';
import Link from 'next/link';
import styles from  '../../styles/Item/categoryHeader.module.css';
import ItemCards from './itemCards';
import CategoryIntro from "./categoryIntro";
import SubCategoryHeader from "./subCategoryHeader";


const CategoryHomePage = ({ categoryData, categoryId, categoryIntro, language = 'de', categoryItems, cart, setCart, preferences, allergens, handleChangeCart = () =>{} , AddToCart =() =>{} }) => {
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
                  <SubCategoryHeader catId={itm.id} subcategoryItems={categoryItems} subcatImage={itm.image} subcatTitle={itm.translations.de.title} {...{handleChangeCart, AddToCart, cart, setCart, preferences, allergens}}/>
            </> )
          })
          :
          <ItemCards catId={categoryId} categoryItems={categoryItems} {...{handleChangeCart, AddToCart, cart, setCart, preferences, allergens}}/>
          }
      </div>
  </>);
};
export default CategoryHomePage;