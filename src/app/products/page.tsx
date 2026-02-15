
import ProductCard from '../_components/ProductCard/ProductCard'
import { Product } from '@/types/Product.type'
import { getAllProducts } from '@/Productsapi/getAllProducts.api';
export default async function Products() {
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
