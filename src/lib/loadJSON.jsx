import "server-only";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

export const loadJSON = (jsonFile) => {
    const jsonFilePath = path.join(process.cwd(), jsonFile);
    if (!fs.existsSync(jsonFilePath)) {
        return notFound();
    }
    return JSON.parse(fs.readFileSync(jsonFilePath, "utf-8"));
}