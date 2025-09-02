import React from "react";

import ExperienceMetaData from "@assets/data/experience/lists/_list_professional.json";

import /*ExperienceDescriptionID,*/ { _generateStaticParams } from "@components/pages/ExperienceDescriptionID";

const ExperienceDescription = async ({ params }) => {
    return <></>;
    // return <ExperienceDescriptionID params={params} metaData={ProjectsMetaData} dataPath="assets/data/projects" />;
};

export async function generateStaticParams() {
    const paths = _generateStaticParams(ExperienceMetaData);
    console.log("EXPERIENCE Static params:", paths);
    return paths;
}

export default ExperienceDescription;
