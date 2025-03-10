"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; //left-right arrows
import "swiper/css/pagination"; //dots

export function GallerySwiper({ swiperClassName, imageList }) {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            loop={true}
            speed={600}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{ clickable: true, type: "bullets" }}
            navigation
            className={swiperClassName}
        >
            {imageList?.map((image, index) => {
                return (
                    <SwiperSlide key={index}>
                        <img src={image} alt="" />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
