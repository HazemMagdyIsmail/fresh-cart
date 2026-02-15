import React from 'react'
import MiniSlider from '../MiniSlider/MiniSlider'

export default async function CategorySlider() {
    const res= await fetch("https://ecommerce.routemisr.com/api/v1/categories")
    const {data}= await res.json()
  return (
    <MiniSlider categories={data} />

  )
}
