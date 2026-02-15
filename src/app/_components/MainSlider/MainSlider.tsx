"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Autoplay } from "swiper/modules"
import Link from "next/link"

const slides = [
  {
    img: "/images/grocery-banner-2.jpeg",
    title: "Fresh groceries delivered fast",
    desc: "Daily essentials straight to your door",
    btn: "Shop Now",
    loc:"/products"
  },
  {
    img: "/images/slider-image-2.jpeg",
    title: "Eat fresh. Live better.",
    desc: "Best quality fruits & veggies every day",
    btn: "Browse Fresh Food",
    loc:"/categories"
  },
  {
    img: "/images/slider-image-3.jpeg",
    title: "Save more on daily needs",
    desc: "Great deals on groceries you love",
    btn: "View Offers",
    loc:"/brands"
  },
]

export default function MainSlider() {
  return (
    <div className="container w-[90%] mx-auto flex flex-col lg:flex-row gap-4 mt-7">

      {/* Main Slider */}
      <div className="w-full lg:w-3/4">

        <Swiper
          slidesPerView={1}
          modules={[Autoplay]}
          autoplay={{ delay: 2500 }}
          loop
          className="rounded-2xl overflow-hidden"
        >
          {slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[420px]">

                <Image
                  src={slide.img}
                  alt="banner"
                  fill
                  priority
                  className="object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20 flex items-center">
                  <div className="text-white px-6 lg:px-12 max-w-lg space-y-4">

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight">
                      {slide.title}
                    </h2>

                    <p className="text-sm sm:text-base opacity-90">
                      {slide.desc}
                    </p>

                    <button className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-full font-semibold">
                      <Link href={`${slide.loc}`}>{slide.btn}</Link>
                      
                    </button>

                  </div>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side banners (desktop only) */}
      <div className="hidden lg:flex lg:w-1/4 flex-col gap-4">

        {["/images/slider-image-1.jpeg", "/images/slider-image-2.jpeg"].map(
          (img, i) => (
            <div
              key={i}
              className="relative w-full h-[200px] rounded-xl overflow-hidden"
            >
              <Image
                src={img}
                alt="side banner"
                fill
                priority
                className="object-cover"
              />
            </div>
          )
        )}
      </div>
    </div>
  )
}
