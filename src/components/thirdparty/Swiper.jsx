"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import "swiper/css";
import "swiper/css/navigation"; //left-right arrows
import "swiper/css/pagination"; //dots

import styles from "@styles/components/thirdparty/swiper.module.scss";
import 'react-lazy-load-image-component/src/effects/blur.css';

export const RichSlide = ({ image, singleSlide }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        if (!isRevealed) {
            setIsRevealed(true);
        }
    };

    return (<SwiperSlide>
        <LazyLoadImage src={image.src} className={image.spoiler && !isRevealed ? styles["image-spoiler"] : null} alt={image.alt} effect="blur" />
        {image.alt ? <div className={`${styles["image-description"]} ${!singleSlide ? styles["padded"] : null}`}>
            {image.alt}
        </div>
            : null}
        {image.spoiler && !isRevealed ? <div className={styles["text-spoiler"]} onClick={handleReveal}>
            SPOILER WARNING<br /> Click to reveal
        </div>
            : null}
    </SwiperSlide>);
}
RichSlide.displayName = 'SwiperSlider';


export function GallerySwiper({ swiperExtraClasses, imageList, autoplayEnabled }) {
    return (
        <Swiper
            modules={[Autoplay, Navigation, Pagination, A11y]}
            loop={imageList?.length > 1}
            speed={600}
            autoplay={autoplayEnabled ? { delay: 5000, disableOnInteraction: true } : false}
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{ clickable: true, type: "bullets" }}
            navigation
            className={`${styles["gallery-slider"]} ${swiperExtraClasses}`}
        >
            {imageList?.map((image, index) => {
                return (
                    <RichSlide image={image} key={index} singleSlide={imageList.length === 1} />
                );
            })}
        </Swiper>
    );
}
