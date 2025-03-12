"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; //left-right arrows
import "swiper/css/pagination"; //dots

import styles from "@styles/components/thirdparty/swiper.module.scss";

export const RichSlide = ({ image }) => {
    const [isRevealed, setIsRevealed] = useState(false);

    const handleReveal = () => {
        if (!isRevealed) {
            setIsRevealed(true);
        }
    };

    return (<SwiperSlide>
        <img src={image.src} alt={image.alt} className={image.spoiler && !isRevealed ? styles["image-spoiler"] : null} />
        {image.alt ? <div className={styles["image-description"]}>
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
            loop={true}
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
                    <RichSlide image={image} key={index} />
                );
            })}
        </Swiper>
    );
}
