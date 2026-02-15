"use client";

import { Category } from "@/types/Category.Type";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function MiniSlider({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="container w-[80%] mx-auto">
      <Swiper
        spaceBetween={0}
        modules={[Autoplay]}
        
        autoplay={{ delay: 1400, disableOnInteraction: false }}
        breakpoints={{
          0: {
            slidesPerView: 2, 
          },
          640: {
            slidesPerView: 3, 
          },
          768: {
            slidesPerView: 4, 
          },
          1024: {
            slidesPerView: 5, 
          },
          1280: {
            slidesPerView: 6, 
          },
        }}
      >
        {categories?.map((single) => (
          <SwiperSlide key={single._id} className=" hover:shadow-2xl hover:translate-y-1  hover:scale-[1.05] bg-white  transition-all duration-500 py-3 rounded"> 
            <Link href={`/categories/${single._id}`} className=" ">
             <Image src={single.image} alt={''} width={100} height={100} className='w-full h-37.5 object-center rounded' ></Image> 
             <p className="text-center">{single.name}</p>
              </Link> 
              </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
