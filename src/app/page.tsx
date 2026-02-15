import Image from "next/image";
import MainSlider from "./_components/MainSlider/MainSlider";
import CategorySlider from "./_components/CategorySlider/CategorySlider";
import ProductList from "./_components/Productlist/productList";
export default function Home() {
  return (
    <>
   
   <div className="mb-3 "><MainSlider/></div>
 <div className="mb-10"><CategorySlider   /></div>
  <ProductList/>
    </>
  );
}
