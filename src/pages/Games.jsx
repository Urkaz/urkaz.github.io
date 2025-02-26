import { React } from "react";
import { Link } from "react-router-dom";

import IsotopeGrid from "../components/Isotope.jsx";
import SectionContent from "../components/SectionsContent.jsx";

import { GameFilterList, GameFilterPlatform, GamesList, cleanText } from "../misc/GamesList.jsx"

const GridGame = ({ category, name, tag, nologo = false, platforms, hasSection = false }) => {
    const content = <>
        <div className={`game-content h-100 ${cleanText(name)}`}>
            <div className="game-overlay">
                {nologo == true ? <p>{name}</p> : <img src={`/img/games/logos/${cleanText(name)}.png`} className="img-fluid" alt={name} />}
            </div>
            <div className="game-info">
                <h4 className="floating-left">{tag}</h4>
                <h4 className="floating-right miniplatforms">
                    {platforms?.map((item, index) => (
                        <img key={index} src={`/img/games/platforms/system_mini_${item}.png`} />
                    ))}
                </h4>
            </div>
        </div>
    </>;

    return <>
        <div className={`col-lg-4 col-md-6 small-grid-item isotope-grid-item ${category.map(cat => `category-${cat}`).join(" ")} ${platforms.map(platform => `category-${platform}`).join(" ")}`}>
            {hasSection ? <Link to={cleanText(name)}>{content}</Link> : content}
        </div>
    </>
};

const Games = () => {
    return (
        <>
            <SectionContent title="Games" description=
                {<>
                    Below you will find a list of all the games in which I worked on thorugh my life, from professional jobs, to educational projects, and game jams.<br />
                    Clicking on a game will redirect you to a new page with more information.
                </>}
                sectionId="games">
                <IsotopeGrid mainFilters={GameFilterList} secondaryfilters={GameFilterPlatform} items={GamesList} GridComponent={GridGame} />
            </SectionContent>
        </>
    );
};

export default Games;