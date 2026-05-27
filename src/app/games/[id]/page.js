import React from "react";

import FullList from "@assets/data/lists/_list_projects_games.json";

import { filterGameListByCategory } from "@src/components/functions";

import ProjectDescriptionID, { _generateStaticParams } from "@components/pages/ProjectDescriptionID";

const GameDescription = async ({ params }) => {
    return <ProjectDescriptionID params={params} metaData={FullList} dataPath="assets/data/games" />;
};

export async function generateStaticParams() {
    let ListFiltered = filterGameListByCategory(FullList, "game");
    const paths = _generateStaticParams(ListFiltered);
    if (process.env.NODE_ENV === "development") console.log("GAMES Static params:", paths);
    return paths;
}

export default GameDescription;
