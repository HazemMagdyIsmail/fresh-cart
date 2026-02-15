"use client" 
import React from 'react'
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
export default function MainSlider() {
  return (
    <div className='container w-[80%] mx-auto flex mt-7 '>

        <div className="w-full lg:w-3/4">
        
         <Swiper
      spaceBetween={0}
      slidesPerView={1}
      modules={[Autoplay]}
      autoplay={{
        delay:1500
      }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide> <Image  src={'/images/grocery-banner-2.jpeg'} alt={''}
        width={300}
        height={400} 
className='w-full h-100 object-center'
priority
        ></Image></SwiperSlide>
      <SwiperSlide> <Image src={'/images/slider-image-2.jpeg'} alt={''}
        width={300}
        height={400} 
className='w-full h-100 object-center'
priority
        ></Image></SwiperSlide>
      <SwiperSlide> <Image src={'/images/slider-image-3.jpeg'} alt={''}
        width={300}
        height={400} 
className='w-full h-100 object-center'
priority
        ></Image></SwiperSlide>
      
    </Swiper>
    </div>
        <div className="hidden lg:block lg:w-1/4">
        <Image src={'/images/slider-image-1.jpeg'} alt={''}
        width={300}
        height={400} 
className='w-full h-50 object-center'
priority
        ></Image>
        <Image src={'/images/slider-image-2.jpeg'} alt={''}
        width={400}
        height={400} 
className='w-full h-50 object-center'
priority
        ></Image>
        

        </div>
    </div>
  )
}
