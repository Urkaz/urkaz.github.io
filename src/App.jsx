import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,

} from "react-router-dom";

import Sections from "./Sections.jsx"

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
  return <RouterProvider router={router} />;
}

export default App
