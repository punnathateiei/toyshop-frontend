import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination  } from 'swiper/modules';

const Contenthome = () => {

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="aspect-[16/6]">
        <Swiper 
        pagination={true}
        modules={[Pagination]}
        className="h-full">
          <SwiperSlide><img src="/images/gundam.jpeg" className="w-full h-full object-cover" /></SwiperSlide>
          <SwiperSlide><img src="/images/gundam-barbatos.jpg" className="w-full h-full object-cover" /></SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}

export default Contenthome