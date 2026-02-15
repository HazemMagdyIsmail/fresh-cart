"use client"

import { getUserWishlist } from "@/WishlistActions/getUserWishlist"
import { createContext, useEffect, useState, ReactNode } from "react"

type WishlistContextType = {
  wishlistIds: string[]
  setWishlistIds: React.Dispatch<React.SetStateAction<string[]>>
  loading: boolean
}

export const WishlistContext = createContext<WishlistContextType | null>(null)

type ProviderProps = {
  children: ReactNode
}

export function WishlistContextProvider({ children }: ProviderProps) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadWishlist() {
      try {
        const res = await getUserWishlist()

        if (res.status === "success") {
          setWishlistIds(res.data.map((p: { id: string }) => p.id))
        }
        else setWishlistIds([])
      } catch (error) {
        console.error("Wishlist load failed", error)
      } finally {
        setLoading(false)
      }
    }

    loadWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{ wishlistIds, setWishlistIds, loading }}>
      {children}
    </WishlistContext.Provider>
  )
}
