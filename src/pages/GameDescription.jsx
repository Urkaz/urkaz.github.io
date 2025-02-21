import React from "react";
import SectionContent from  "../components/SectionsContent.jsx";
import { useParams } from 'react-router-dom';

const GameDescription = () => {
    const { gameName } = useParams();

    return (
        <>
            <SectionContent title="GameDescription" description={gameName} sectionId="gamedetails">
                <div className="page-title" data-aos="fade">TEST</div>
            </SectionContent>
        </>
    );
};

export default GameDescription;