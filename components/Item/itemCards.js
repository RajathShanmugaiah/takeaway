import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import styles from "../../styles/Item/itemCards.module.css"
import Vegetarian from '../../config/icons/vegetarian';
import Vegan from '../../config/icons/vegan';
import { Add, SettingsPowerRounded } from '@material-ui/icons';

const ItemMealCard=({
    mealdata,
    cart,
    setCart
    // AddToCart=() => {},
    // handleChangeCart=() =>{}
}) =>{
    const [hover, setHover] = useState(false);
    const [open, setOpen] = React.useState(false)
    const quantityNo = 1;

    
  const handleChangeCart = newCart => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

const AddToCart = (itemId, qty) =>{
    let newCart = [...cart];
    let elemFound = newCart.find(cartItem => cartItem.meal.id === itemId.id )
    if(elemFound){
        elemFound.quantity += qty;
    }else{
        newCart.push({meal: itemId, quantity: qty })
    }
    handleChangeCart(newCart)
}

    return(

        <div id={styles.categoryItemCards}>
                    <div className={styles.card}>
                        <div className={styles.mealContainer}>
                            <div className={styles.mealHeader}>
                                <h5><b>{mealdata.translations.de.title}</b></h5>
                                <div style={{display: "inline-flex", marginLeft: "5px",marginTop: "1.6rem", fontSize: "11px", fontStyle: "italic", alignItems: "flex-end"}}>
                                    {mealdata.allergens?.map( (item,idx) => (<span>{mealdata.allergens.length === (idx+1)? item : item+`,`}</span>))} 
                                    <span>
                                        {mealdata.vegan && mealdata.vegetarian 
                                            ? <><span><Vegetarian/></span><span><Vegan/></span> </>
                                            : mealdata.vegan && !mealdata.vegetarian 
                                            ? <><span><Vegan/></span></>
                                            : !mealdata.vegan && mealdata.vegetarian 
                                            ? <><span><Vegetarian/></span></>
                                            : ""}
                                    </span>
                                </div>
                                <h5><b>€{(mealdata.price).toFixed(2).replace('.', ',')}</b></h5>
                            </div>
                            <p dangerouslySetInnerHTML={{__html: mealdata.translations.de.description}} ></p>
                            <div style={{display: "flex", justifyContent: "flex-end", marginTop: "10px"}}>
                                <button className={styles.cartButton}   onMouseEnter={e => setHover(true) } onMouseLeave={e => setHover(false) } onClick={() => AddToCart(mealdata,quantityNo)}>
                                    <div class={styles.cartButtonCover} style={{ background: hover ? `var(--primary-color)` : null }}>
                                    <Add />
                                    <span className={styles.clicked} >+1</span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
    )

}

const ItemCards = ({ catId,cart,setCart, categoryItems, language = 'de' }) => {
    const filteredsubCatData = categoryItems.filter(item => item.subCategory === catId)

    return(<>
        {
            filteredsubCatData.length > 0 ?
            filteredsubCatData.map(
                itm => ( 
                    <ItemMealCard mealdata={itm} cart={cart} setCart={setCart} />       
                )
            )
            :
            categoryItems.map(item => (        
                    <ItemMealCard mealdata={item} cart={cart} setCart={setCart} />
                ))
        }
    </>)
}
export default ItemCards;