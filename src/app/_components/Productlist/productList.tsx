
import { Product } from '@/types/Product.type'
import { getAllProducts } from '@/Productsapi/getAllProducts.api';
import ProductCard from '../ProductCard/ProductCard';
export default async function ProductList() {
  const data = await getAllProducts();
 
  return (
    
    <div className='container w-[90%] mx-auto'>
      

      <div className='flex flex-wrap'>
        {data?.map((product: Product)=>{

return  <ProductCard key={product.id} product={product} />
 
})}
      </div>
    </div>
   
  )
}
