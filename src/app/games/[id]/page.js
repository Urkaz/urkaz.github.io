import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import FullList from "@assets/data/lists/_list_projects_games.json";
import { filterGameListByCategory } from "@src/components/functions";

import ProjectDescriptionID, { _generateStaticParams } from "@components/pages/ProjectDescriptionID";

const GameDescription = async ({ params }) => {
    const { id } = await params;
    const projectMetaData = FullList[id];

    if (!projectMetaData?.hasSection) notFound();

    const jsonFilePath = path.join(process.cwd(), "assets/data/games", `${id}.json`);
    const mdFilePath = path.join(process.cwd(), "assets/data/games", `${id}.md`);

    if (!fs.existsSync(jsonFilePath) || !fs.existsSync(mdFilePath)) notFound();

    const projectData = JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
    const markdownContent = fs.readFileSync(mdFilePath, "utf-8");

    return (
        <ProjectDescriptionID
            name={projectMetaData.name}
            projectData={projectData}
            markdownContent={markdownContent}
        />
    );
};

export async function generateStaticParams() {
    const ListFiltered = filterGameListByCategory(FullList, "game");
    const paths = _generateStaticParams(ListFiltered);
    if (process.env.NODE_ENV === "development") console.log("GAMES Static params:", paths);
    return paths;
}

export default GameDescription;
