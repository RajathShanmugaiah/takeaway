import React from 'react';
import Link from 'next/link';
import styles from  '../../styles/Item/categoryHeader.module.css';
import ItemCards from './itemCards';

const SubCategoryElement = ({
    catId,
    subcatTitle,
    subcatImage,
    subcategoryItems,
    cart,
    setCart,
    preferences,
    allergens,
    handleChangeCart =() =>{},
    AddToCart=()=>{}
})=>{
    return(
        <div>
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
            <ItemCards catId={catId} categoryItems={subcategoryItems} {...{cart, setCart, handleChangeCart, AddToCart, preferences, allergens}}/>
        </div>
    )
}

const SubCategoryHeader = ({
    catId,
    subcatTitle,
    subcatImage,
    subcategoryItems,
    cart,
    setCart,
    preferences,
    allergens,
    handleChangeCart =() =>{},
    AddToCart=()=>{}
  }) =>{
  
    let veganDiet = null;
    let vegDiet = null;
    let alkohol = null;
  
    const filteredsubCatData = subcategoryItems.filter(item => item.subCategory === catId )
    const filteredCategory = filteredsubCatData.find(item => {
      if(item.vegan && item.vegetarian){
        veganDiet = "vegan"
        vegDiet = "vegetarian"
      }
      else if(item.vegan && !item.vegetarian)
        veganDiet = "vegan"
      else if(!item.vegan && item.vegetarian ){
        vegDiet = "vegetarian"
        veganDiet = "vegan"
      }
  
      if(item.alcoholic)
        alkohol = "alkoholic"
    }) 

    return(<>
            {
              preferences.length > 0 && preferences?.includes( veganDiet || (veganDiet && veganDiet) || (alkohol) )?
                  (<SubCategoryElement {...{ catId,subcatTitle,subcatImage,subcategoryItems,cart,setCart,preferences,allergens,handleChangeCart,AddToCart }} />)
                  :
                  preferences.length === 0 &&
                  (<SubCategoryElement {...{ catId,subcatTitle,subcatImage,subcategoryItems,cart,setCart,preferences,allergens,handleChangeCart,AddToCart }} />)
            }
    </>)
  }
  export default SubCategoryHeader