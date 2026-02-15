export async function getAllProductsBy(id:string,type:string){

 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products?${type}=${id}`)
 const {data}= await res.json()

return data;
}