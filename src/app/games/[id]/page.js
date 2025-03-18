import React from "react";

import GameMetaData from "@assets/data/games/lists/_list_games.json";

import ProjectDescriptionID, { _generateStaticParams } from "@components/pages/ProjectDescriptionID";

const GameDescription = async ({ params }) => {
    return <ProjectDescriptionID params={params} metaData={GameMetaData} dataPath="assets/data/games" />;
};

export async function generateStaticParams() {
    return _generateStaticParams(GameMetaData);
}

export default GameDescription;
