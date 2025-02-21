import { React, useEffect } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,

} from "react-router-dom";
import Sass from "sass.js";

import Sections from "./misc/Sections.jsx"
import { GamesList, PersonalProjectsList, cleanText } from "./misc/GamesList.jsx"

const generateRoutes = (routes) =>
  createRoutesFromElements(
    routes.map(({ path, element, children }, index) => (
      <Route key={index} path={path} element={element}>
        {children?.map(({ path, element, index }, subIndex) => (
          <Route key={subIndex} path={path} index={index} element={element} />
        ))}
      </Route>
    ))
  );

const router = createBrowserRouter(generateRoutes(Sections));

function App() {
  useEffect(() => {
    // Generar código Sass dinámico
    const sassCodeGames = GamesList
      .map((game) => `.${cleanText(game.name)} { background-image: url("/img/games/tiles/${cleanText(game.name)}.png"); }`)
      .join("\n");
      const sassCodeProjects = PersonalProjectsList
      .map((game) => `.${cleanText(game.name)} { background-image: url("/img/games/tiles/${cleanText(game.name)}.png"); }`)
      .join("\n");

    // Compilar Sass a CSS
    Sass.compile(sassCodeGames, (result) => {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = result.text;
      document.head.appendChild(styleTag);
      return () => document.head.removeChild(styleTag); // Limpieza al desmontar
    });

    Sass.compile(sassCodeProjects, (result) => {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = result.text;
      document.head.appendChild(styleTag);
      return () => document.head.removeChild(styleTag); // Limpieza al desmontar
    });

  }, []);

  return <RouterProvider router={router} />;
}

export default App
