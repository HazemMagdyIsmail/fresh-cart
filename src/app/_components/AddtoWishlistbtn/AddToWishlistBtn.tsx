"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { addToWishlist } from "@/WishlistActions/AddToWishlist"
import { removeWishlistItem } from "@/WishlistActions/removeWishlistItem"
import { WishlistContext } from "@/context/WIshlistContext"
import { useContext, useState } from "react"


export default function WishlistBtn({ id }:{id:string}) {
  const { wishlistIds, setWishlistIds, loading } = useContext(WishlistContext)!
  const [isLoading, setIsLoading] = useState(false)

 
  const isInWishlist = wishlistIds.includes(id)

  async function toggleWishlist() {
    if (isLoading) return
    setIsLoading(true)

    try {
      if (isInWishlist) {
        const res = await removeWishlistItem(id)
        if (res.status === "success") {
          setWishlistIds(prev => prev.filter(pid => pid !== id))
          toast.success("Removed from wishlist")
        }
      } else {
        const res = await addToWishlist(id)
        if (res.status === "success") {
          setWishlistIds(prev => [...prev, id])
          toast.success("Added to wishlist")
        }
      }
    } catch {
      toast.error("You should login first!")
    } finally {
      setIsLoading(false)
    }
  }

 if (loading) {
  return (
    <Button
      size="icon"
      disabled
      className="rounded-md   bg-linear-to-r from-gray-200 via-gray-300 to-gray-200
        animate-pulse duration-500"
    >
     
    </Button>
  )
}



  return (
    <Button
      onClick={toggleWishlist}
      disabled={isLoading}
      size="icon"
      variant="outline"
      className={`transition-all duration-300
        ${
          isInWishlist
            ? "border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white"
            : "border-gray-300 text-gray-400 hover:border-rose-600 hover:text-rose-600"
        }
        ${isLoading ? "bg-gray-200 cursor-not-allowed" : ""}
      `}
    >
      {isLoading ? (
        <i className="fas fa-spinner fa-spin" />
      ) : (
        <i className={`fa-heart ${isInWishlist ? "fa-solid" : "fa-regular"}`} />
      )}
    </Button>
  )
}
