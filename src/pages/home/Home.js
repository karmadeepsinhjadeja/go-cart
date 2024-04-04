
import { useDispatch, useSelector } from "react-redux";
import Filter from "../../components/filter/Filter";
import Herosection from "../../components/herosection/Herosection";
import Layout from "../../components/layout/Layout";
import ProductCard from "../../components/productcard/ProductCard";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";


function Home() {
 const dispatch = useDispatch();
 const cartItem = useSelector((state)=>state.cart)
 console.log(cartItem)

 const addCart = ()=> {
  dispatch(addToCart("shirt"));
 }

 const deleteCart =()=>{
  dispatch(deleteFromCart("shirt"));
 }
  return (
    <Layout>
      <Herosection/>
      <Filter/>
      <ProductCard/>
    </Layout>
  );
}

export default Home;
