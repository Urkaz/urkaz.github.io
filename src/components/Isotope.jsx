import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";

const IsotopeGrid = ({ filters, secondaryfilters, items, GridComponent }) => {
  const gridRef = useRef(null);
  const [isotope, setIsotope] = useState(null);
  const [filter, setFilter] = useState("*");
  const [secondaryfilter, setSecondaryFilter] = useState("*");
  const [gameIds] = useState(() =>
    items.map(() => crypto.randomUUID())
  );

  useEffect(() => {
    if (gridRef.current) {
      const iso = new Isotope(gridRef.current, {
        itemSelector: ".isotope-grid-item",
        layoutMode: "fitRows",
      });
      setIsotope(iso);
    }
  }, []);

  useEffect(() => {
    if (isotope) {
      filter === "*"
        ? isotope.arrange({ filter: "*" })
        : isotope.arrange({ filter });
    }
  }, [filter, isotope]);

  return (
    <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
      <div>
        {/* Botones para filtrar */}
        {filters ?
          <ul className="isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {filters.map((f) => (
              <li key={f.name} onClick={() => setFilter(f.selector)} className={filter === f.selector ? "filter-active" : "filter-inactive"}>
                {f.name}
              </li>
            ))}
          </ul>
          : null}
        {secondaryfilters ?
          <ul className="isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {secondaryfilters.map((f) => (
              <li key={f.name} onClick={() => setSecondaryFilter(f.selector)} className={secondaryfilter === f.selector ? "filter-active" : "filter-inactive"}>
                {f.name}
              </li>
            ))}
          </ul>
          : null}


        {/* Grid de elementos con un componente dinámico */}
        <div ref={gridRef} className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          {items.map((item, index) => (
            <GridComponent {...item} key={gameIds[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default IsotopeGrid;