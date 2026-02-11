import React from "react";

import FullList from "@assets/data/lists/_list_projects_games.json";

import { filterGameListByCategory } from "@src/components/functions";

import ProjectDescriptionID, { _generateStaticParams } from "@components/pages/ProjectDescriptionID";

const ProjectDescription = async ({ params }) => {
    return <ProjectDescriptionID params={params} metaData={FullList} dataPath="assets/data/projects" />;
};

export async function generateStaticParams() {
    let ListFiltered = filterGameListByCategory(FullList, "personal");
    const paths = _generateStaticParams(ListFiltered);
    console.log("PROJECTS Static params:", paths);
    return paths;
}

export default ProjectDescription;
