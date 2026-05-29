import React from "react";

import ExperienceDescriptionID from "@components/pages/ExperienceDescriptionID";
import CatnessEngineList from "@assets/data/experience/lists/catnessgamestudios/_catness_list.json";

const subListMap = {
    catnessgamestudios: CatnessEngineList,
};

const ExperienceSubDescription = async ({ params }) => {
    const { id } = await params;
    const subMetaData = subListMap[id];

    return (
        <ExperienceDescriptionID
            params={params}
            metaData={subMetaData}
            dataPath={`assets/data/experience/${id}`}
            paramKey="subid"
        />
    );
};

export async function generateStaticParams() {
    const paths = [];
    for (const [id, subList] of Object.entries(subListMap)) {
        Object.keys(subList)
            .filter((key) => subList[key].hasSection === true)
            .forEach((subid) => paths.push({ id, subid }));
    }
    console.log("EXPERIENCE SUBID Static params:", paths);
    return paths;
}

export default ExperienceSubDescription;