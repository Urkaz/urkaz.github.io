import Layout from "../layouts/MainLayout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Experience from "../pages/Experience.jsx";
import Projects from "../pages/Projects.jsx";
import Games from "../pages/Games.jsx";
import Contact from "../pages/Contact.jsx";
import Education from "../pages/Education.jsx";
import GameDescription from "../pages/GameDescription.jsx";

const Sections = [
  {
    path: "/",
    element: <Layout />,
    sectionName: "Home",
    children: [
      { index: true, element: <Home /> },
      { path: "/experience", element: <Experience />, sectionName: "Experience" },
      { path: "/experience/:workName", element: <GameDescription />, hidden: true },
      { path: "/education", element: <Education />, sectionName: "Education" },
      { path: "/education/:workName", element: <GameDescription />, hidden: true },
      { path: "/projects", element: <Projects />, sectionName: "Personal Projects" },
      { path: "/projects/:gameName", element: <GameDescription />, hidden: true },
      { path: "/games", element: <Games />, sectionName: "Games"},
      { path: "/games/:gameName", element: <GameDescription />, hidden: true },
      { path: "/contact", element: <Contact />, sectionName: "Contact" },
    ],
  },
];

export default Sections;