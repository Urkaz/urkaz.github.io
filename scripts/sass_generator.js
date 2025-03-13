const fs = require("fs");
const path = require("path");
const { cleanText } = require("../src/components/functions");

const GamesList = require("../assets/data/games/lists/_list_games.json");
const PersonalProjectsList = require("../assets/data/projects/lists/_list_projects.json");

function generateCode() {
    const sassCodeGames = Object.entries(GamesList)
        .map(([key, game]) => `.${key} { background-image: url("/img/games/tiles/${cleanText(game.name)}.png"); }`)
        .join("\n");
    const sassCodeProjects = Object.entries(PersonalProjectsList)
        .map(([key, game]) => `.${key} { background-image: url("/img/games/tiles/${cleanText(game.name)}.png"); }`)
        .join("\n");

    var sassCode = sassCodeGames.concat("\n").concat(sassCodeProjects);
    return sassCode;
}

function saveCode(scss) {
    const fileName = path.join(process.cwd(), "src", "styles", "generated.scss");
    fs.writeFileSync(fileName, scss);
    console.log(" ✅ SCSS file successfully generated:", fileName);
}

function GenerateSCSS() {
    //const code = generateCode();
    //saveCode(code);
}

GenerateSCSS();
