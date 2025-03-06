import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import { SectionContent } from "@components/common/SectionsContent.jsx";

import ProjectsMetaData from "@assets/data/projects/lists/_list_projects.json";

const ProjectDescription = async ({ params }) => {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "assets", "data", "projects", `${id}.json`);

    if (!fs.existsSync(filePath)) {
        return notFound();
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    const gameData = JSON.parse(fileContent);
    const gameMetaData = ProjectsMetaData[id];

    if (!gameData || !gameMetaData.hasSection) {
        notFound();
    }

    return (
        <>
            <SectionContent title={gameMetaData.name} description={gameData.description} sectionId="gamedetails">
                <div className="row gy-4">
                    TEST
                </div>
            </SectionContent>
        </>
    );
};

export function generateStaticParams() {
    return Object.keys(ProjectsMetaData)
        .filter((key) => ProjectsMetaData[key].hasSection == true)
        .map((key) => ({
            id: key,
        }));
}

export default ProjectDescription;
