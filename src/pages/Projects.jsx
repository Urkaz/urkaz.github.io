import { React } from "react";
import { Link } from "react-router-dom";

import SectionContent from "../components/SectionsContent.jsx"
import IsotopeGrid from "../components/Isotope.jsx"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLink } from '@fortawesome/free-solid-svg-icons'

import { PersonalProjectsFilterList, PersonalProjectsList, cleanText } from "../misc/GamesList.jsx"

const GridGame = ({ category, name, tag, noLogo = false, platforms, hasSection = false }) => {
    const content = <>
        <div className={`game-content h-100 ${cleanText(name)}`}>
            {hasSection ?
                <div className="fold"><div className="fold-link"><FontAwesomeIcon icon={faLink} /></div></div>
                : null}
            <div className="game-overlay">
                {noLogo == true ? <p>{name}</p> : <img src={`/img/games/logos/${cleanText(name)}.png`} className="img-fluid" alt={name} />}
            </div>
            <div className="game-info">
                <h4 className="floating-left">{tag}</h4>
                {platforms ?
                    <h4 className="floating-right miniplatforms">
                        {platforms?.map((item, index) => (
                            <img key={index} src={`/img/games/platforms/system_mini_${item}.png`} />
                        ))}
                    </h4>
                    : null}
            </div>
        </div>
    </>;

    return <>
        <div className={`col-lg-4 col-md-6 small-grid-item isotope-grid-item ${category.map(cat => `category-${cat}`).join(" ")} ${platforms?.map(platform => `category-${platform}`).join(" ")}`}>
            {hasSection ? <Link to={cleanText(name)}>{content}</Link> : content}
        </div>
    </>
};

const Projects = () => {
    return (
        <SectionContent title="Personal Projects" description="<TODO>" sectionId="projects">
            <IsotopeGrid mainFilters={PersonalProjectsFilterList} items={PersonalProjectsList} GridComponent={GridGame} />
        </SectionContent>
    );
};

export default Projects;