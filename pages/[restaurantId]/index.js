import { useRouter } from 'next/router';
import CategoryTabs from '../../components/General/categoryTabs';
import Header from '../../components/General/header';
import HeroImage from '../../components/General/HeroImage';

export async function getServerSideProps(context) {
    const restaurantId = context.query.restaurantId;
    const res = await fetch(
        `https://api.gastronaut.ai/v02/menues/takeAway/${restaurantId}`
      );
      const data = await res.json();
      return {
        props: {
          data,
          restaurantId
        }
    }
}

export default function RestaurantHomePage(props) {
    const router = useRouter();
    const { data,restaurantId } = props;
    return (
        <>

        </>
    )
}  