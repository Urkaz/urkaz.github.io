import React from "react";
import GameList from "@assets/data/games/_list_games.json";
//import { notFound } from "next/navigation";

import { SectionContent } from "@components/common/SectionsContent.jsx";

//import { Swiper, SwiperSlide } from 'swiper/react';
//import { Autoplay, Pagination, Navigation, A11y } from 'swiper/modules';

const GameDescription = ({ params }) => {
    const gameData = GameList[params.sub];

    {/*if (!gameData || gameData.hasSection != true) {
        notFound();
    */}

    return (
        <>
            <SectionContent title={gameData.name} description={gameData.description} sectionId="gamedetails">
                <div className="row gy-4">
                    <div className="col-lg-8" style={{ padding: 0 }} data-aos="fade-up" data-aos-delay="100">
                        <div className="porfolio-video">
                            <iframe
                                src={gameData.video}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="portfolio-info" data-aos="fade-up" data-aos-delay="200">
                            <h3>Project Details</h3>
                            <ul>
                                <li>
                                    <strong>Company</strong>: Catness Game Studios
                                </li>
                                <li>
                                    <strong>Role</strong>: {gameData.category}
                                </li>
                                <li>
                                    <strong>Project Length</strong>: 4 months
                                </li>
                                <li>
                                    <strong>Team Size</strong>: 3 Developers
                                </li>
                                <li>
                                    <strong>Engine</strong>: {gameData.engine}
                                </li>
                                <li>
                                    <strong>Platforms</strong>: Porting
                                </li>
                                <li>
                                    <strong>Project links</strong>: <a href="#">www.example.com</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row gy-4" data-aos="fade-up" data-aos-delay="300"></div>
                {/*<div className="row gy-4" data-aos="fade-up" data-aos-delay="300">
                    <Swiper
                        modules={[Autoplay, Navigation, Pagination, A11y]}
                        loop={true}
                        speed={600}
                        autoplay={{ delay: 5000, disableOnInteraction: true }}
                        slidesPerView={'auto'}
                        spaceBetween={0}
                        pagination={{ clickable: true, type: 'bullets', el: '.swiper-pagination' }}
                        navigation
                        className="portfolio-details-slider"
                    >
                        <SwiperSlide><img src={app1} alt="" /></SwiperSlide>
                        <SwiperSlide><img src={app2} alt="" /></SwiperSlide>
                        <SwiperSlide><img src={app3} alt="" /></SwiperSlide>
                    </Swiper>
                </div>*/}
            </SectionContent>
        </>
    );
};

export function generateStaticParams() {
    return Object.keys(GameList)
        .filter((key) => GameList[key].hasSection == true)
        .map((key) => ({
            sub: key,
        }));
}

export default GameDescription;
