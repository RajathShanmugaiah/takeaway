import { useRouter } from 'next/router';
import CategoryTabs from '../../../components/General/categoryTabs';
import Header from '../../../components/General/header';
import HeroImage from '../../../components/General/HeroImage';
import CategoryHeaderImage from '../../../components/Item/categoryHeaderImage';
import FirstModal from '../../../components/Modal/modal';

export async function getServerSideProps(context) {
    const restaurantId = context.query.restaurantId;
    const categoryId = context.query.categoryId;
    const res = await fetch(
        `https://api.gastronaut.ai/v02/menues/takeAway/${restaurantId}`
      );
      const data = await res.json();
      const categoryData = data.subCategories.filter(item => item.category === categoryId);
      const categoryIntro = data.categories.filter(item => item.id === categoryId);

      const categoryItems = data.meals.filter(item => item.category === categoryId )
      
      return {
        props: {
          data,
          categoryId,
          restaurantId,
          categoryData,
          categoryIntro,
          categoryItems
        }
    }
}

export default function RestaurantHomePage(props) {
    const router = useRouter();
    const { data,restaurantId, categoryId, categoryData, categoryIntro, categoryItems, cart, setCart, handleChangeCart, AddToCart } = props;
    return (
        <>
            <HeroImage image={data.restaurant.headerBackground? data.restaurant.headerBackground : data.restaurant.logo}/>
            <div className="mealsOuterContainer">
                <CategoryTabs tabs = {data.categories} id={data.categories[0].id} restaurant={restaurantId}/>
                <div id="itemCardsContainer">
                    <div className="card">
                        <CategoryHeaderImage {...{categoryId, categoryData, categoryIntro, categoryItems, cart,setCart, handleChangeCart, AddToCart}}/>
                    </div>
                </div>
            </div>
        </>
    )
}  