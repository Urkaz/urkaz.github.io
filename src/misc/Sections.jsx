import Layout from "../layouts/MainLayout/MainLayout.jsx";
import Home from "../pages/Home.jsx";
import Experience from "../pages/Experience.jsx";
import Projects from "../pages/Projects.jsx";
import Games from "../pages/Games.jsx";
import Contact from "../pages/Contact.jsx";

const Sections = [
  {
    path: "/",
    element: <Layout />,
    sectionName: "Home",
    children: [
      { index: true, element: <Home /> },
      { path: "/experience", element: <Experience />, sectionName: "Experience" },
      { path: "/projects", element: <Projects />, sectionName: "Personal Projects" },
      {
        path: "/games", element: <Games />, sectionName: "Games",
        children: [
          { path: "xuanyuansword7", element: <Home />, sectionName: "Xuan Yuan Sword 7" },
          { path: "togges", element: <Home />, sectionName: "Togges" },
        ]
      },
      { path: "/contact", element: <Contact />, sectionName: "Contact" },
    ],
  },
];

export default Sections;