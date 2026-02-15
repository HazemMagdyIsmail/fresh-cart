"use client"

import { addToCart } from '@/CartActions/AddToCart'
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/CartContext'
import  { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function AddToCartBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const { setCartCount } = useContext(CartContext)!

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

  async function handleClick() {
    setLoading(true)
    await addProductToCart(id)
    setLoading(false)
  }

  return (
    <Button
      onClick={handleClick}
      disabled={loading}
      className={`flex-10 border-green-600 text-green-600 border-2 transition-all duration-500 
        ${loading ? 'bg-green-600 text-white cursor-not-allowed' : 'hover:bg-green-600 hover:text-white'}`}
      variant="outline"
    >
      <i className="fas fa-cart-plus mr-2"></i>
      {loading ? 'Adding...' : 'Add to cart'}
    </Button>
  )
}
