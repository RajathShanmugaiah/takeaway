import React,{useState, useEffect} from 'react';
import Link from 'next/link';
import styles from "../../styles/Item/itemCards.module.css"
import Vegetarian from '../../config/icons/vegetarian';
import Vegan from '../../config/icons/vegan';

const MealCategory = ({mealdata}) =>{
    return(
        <>
            {mealdata.vegan && mealdata.vegetarian 
                ? <><span><Vegetarian/></span><span><Vegan/></span> </>
                : mealdata.vegan && !mealdata.vegetarian 
                ? <><span><Vegan/></span></>
                : !mealdata.vegan && mealdata.vegetarian 
                ? <><span><Vegetarian/></span></>
            : ""}
        </>
    )
}
export default MealCategory