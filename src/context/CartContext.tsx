"use client"

import { getUserCart } from "@/CartActions/getUserCart"
import { CartProduct } from "@/types/CartTypes"
import { createContext, useEffect, useState, ReactNode } from "react"

type CartContextType = {
  CartCount: number
  setCartCount: React.Dispatch<React.SetStateAction<number>>
  
}

export const CartContext = createContext<CartContextType | null>(null)

type ProviderProps = {
  children: ReactNode
}

export function CartContextProvider({ children }: ProviderProps) {
  const [CartCount, setCartCount] = useState<number>(0)
  

 useEffect(() => {
  async function loadCart() {
    try {
      const res = await getUserCart();

      if (res.status === "success") {
        let sum = 0;

        res.data.products.forEach((product: CartProduct) => {
          sum += product.count;
        });

        setCartCount(sum);
      } else {
       
        setCartCount(0);
      }
    } catch (error) {
      console.error("Cart load failed", error);
      setCartCount(0);
    }
  }

  loadCart();
}, []);


  return (
    <CartContext.Provider value={{ CartCount, setCartCount}}>
      {children}
    </CartContext.Provider>
  )
}
