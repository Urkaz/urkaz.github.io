import React from "react";

import ProjectsMetaData from "@assets/data/projects/lists/_list_projects.json";

import ProjectDescriptionID, { _generateStaticParams } from "@components/pages/ProjectDescriptionID";

const ProjectDescription = async ({ params }) => {
    return <ProjectDescriptionID params={params} metaData={ProjectsMetaData} dataPath="assets/data/projects" />;
};

export async function generateStaticParams() {
    return _generateStaticParams(ProjectsMetaData);
}

export default ProjectDescription;
