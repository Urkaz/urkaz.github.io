import React from "react";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

import ExperienceMetaData from "@assets/data/experience/lists/_list_professional.json";

import ExperienceDescriptionID, { _generateStaticParams } from "@components/pages/ExperienceDescriptionID";
import ExperienceInfoBlock from "@components/pages/ExperienceInfoBlock";

const ExperienceDescription = async ({ params }) => {
    const { id } = await params;
    const projectMetaData = ExperienceMetaData[id];

    if (!projectMetaData?.hasSection) notFound();

    const mdFilePath = path.join(process.cwd(), "assets/data/experience", `${id}.md`);
    const markdownContent = fs.readFileSync(mdFilePath, "utf-8");

    return (
        <ExperienceDescriptionID
            name={projectMetaData.name}
            role={projectMetaData.role}
            markdownContent={markdownContent}
            headerContent={<ExperienceInfoBlock data={projectMetaData} />}
        />
    );
};

export async function generateStaticParams() {
    const paths = _generateStaticParams(ExperienceMetaData);
    console.log("EXPERIENCE Static params:", paths);
    return paths;
}

export default ExperienceDescription;
