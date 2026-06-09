import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import CatnessEngineList from "@assets/data/experience/lists/catnessgamestudios/_catness_list.json";

import ExperienceDescriptionID from "@components/pages/ExperienceDescriptionID";

const subListMap = {
    catnessgamestudios: CatnessEngineList,
};

const ExperienceSubDescription = async ({ params }) => {
    const { id, subid } = await params;
    const subMetaData = subListMap[id]?.[subid];

    if (!subMetaData?.hasSection) notFound();

    const mdFilePath = path.join(process.cwd(), `assets/data/experience/${id}`, `${subid}.md`);
    const markdownContent = fs.readFileSync(mdFilePath, "utf-8");

    return (
        <ExperienceDescriptionID
            name={subMetaData.name}
            markdownContent={markdownContent}
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
