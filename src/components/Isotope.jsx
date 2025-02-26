import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";

function concatValues( obj ) {
  var value = '';
  for ( var prop in obj ) {
    value += obj[ prop ];
  }
  return value;
}

const IsotopeGrid = ({ mainFilters, secondaryfilters, items, GridComponent }) => {
  const gridRef = useRef(null);
  const [isotope, setIsotope] = useState(null);
  const [filter, setFilter] = useState("");
  const [secondaryfilter, setSecondaryFilter] = useState("");
  const [gameIds] = useState(() =>
    items.map(() => crypto.randomUUID())
  );
  const [filterIds] = useState(() =>
    mainFilters?.map(() => crypto.randomUUID())
  );
  const [secondaryFilterIds] = useState(() =>
    secondaryfilters?.map(() => crypto.randomUUID())
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
      var _mainFilter = mainFilters ? filter : "";
      var _secondaryfilter = secondaryfilters ? secondaryfilter : "";

      var finalFilter = concatValues([_mainFilter, _secondaryfilter]);

      isotope.arrange({ filter: finalFilter });
    }
  }, [filter, secondaryfilter, isotope]);

  return (
    <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
      <div>
        {/* Botones para filtrar */}
        {mainFilters ?
          <ul className="isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {mainFilters.map((f, index) => (
              <li key={filterIds[index]} onClick={() => setFilter(f.selector)} className={filter === f.selector ? "filter-active" : "filter-inactive"}>
                {f.name}
              </li>
            ))}
          </ul>
          : null}
        {secondaryfilters ?
          <ul className="isotope-filters" data-aos="fade-up" data-aos-delay="100">
            {secondaryfilters.map((f, index) => (
              <li key={secondaryFilterIds[index]} onClick={() => setSecondaryFilter(f.selector)} className={`miniplatforms ${secondaryfilter === f.selector ? "filter-active" : "filter-inactive"}`}>
                {f.name ?
                  <>{f.name}</>
                  :
                  <img src={f.img} />
                }
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