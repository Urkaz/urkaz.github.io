const fs = require("fs");
const path = require("path");
const { cleanText } = require("../src/components/functions");

const GamesList = require("../assets/data/lists/_list_projects_games.json");

function generateCode() {
    const sassCodeGames = Object.entries(GamesList)
        .map(([key, game]) => `.${key} { background-image: url("/img/games/tiles/${cleanText(game.name)}.png"); }`)
        .join("\n");

    var sassCode = sassCodeGames;
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
