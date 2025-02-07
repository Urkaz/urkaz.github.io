import { React } from "react";

import IsotopeGrid from "../components/Isotope.jsx";

import { GameFilterList, GamesList, cleanText } from "../misc/GamesList.jsx"

const GridGame = ({ category, name, tag, nologo = false }) => {
    return <>
        <div className={`col-lg-4 col-md-6 grid-item ${category.map(cat => `category-${cat}`).join(" ")}`}>
            <a target="blank" href="https://catnessgames.com/games/xuan-yuan-sword-7/">
                <div className={`portfolio-content h-100 ${cleanText(name)}`}>
                    <div className="portfolio-overlay">
                        {nologo == true ? <p>{name}</p> : <img src={`/img/games/logos/${cleanText(name)}.png`} className="img-fluid" alt={name}/> }
                        <div className="portfolio-info">
                            <h4>{tag}</h4>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </>
};

const Games = () => {
    return (
        <>
            <div className="page-title" data-aos="fade">
                <div className="heading">
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1>Games</h1>
                                <p className="mb-0">In this section you can see all the games in which I worked on, from Porting, to QA, to personal or educational projects.<br />You can use the filters to show and hide the different categories. Clicking on a game will redirect you to a new page with more information.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <nav className="breadcrumbs">
                    <div className="container">
                        <ol>
                            <li><a href="/">Home</a></li>
                            <li className="current">Games</li>
                        </ol>
                    </div>
                </nav>
            </div>
            <section id="portfolio" className="portfolio section">
                <div className="container">
                    <IsotopeGrid filters={GameFilterList} items={GamesList} GridComponent={GridGame} />
                </div>
            </section>
        </>
    );
};

export default Games;