"use client"

import { addToCart } from '@/CartActions/AddToCart'
import { Button } from '@/components/ui/button'
import  { useContext } from 'react'
import { toast } from 'sonner'

import { CartContext } from '@/context/CartContext'

export default function DetailsAddToCartBtn({ id }: {id:string}) {
  const {setCartCount } = useContext(CartContext)!
 async function addProductToCart(productId: string) {
    const res = await addToCart(productId)

    if (res.status === "success") {
      toast.success('Product added to cart!')
      setCartCount(prev => prev + 1)   
    } else {
      toast.error(res?.message || 'Failed to add product.')
    }

    return res
  }
  

  return (
    <Button
      onClick={() => addProductToCart(id)}
      className="w-full bg-green-600 text-white  hover:bg-green-500 transition-all duration-500"
      
    >
      <i className="fas fa-cart-plus mr-2"></i>
      Add to cart
    </Button>
  )
}
