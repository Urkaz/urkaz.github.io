import { React, useEffect, useRef } from "react";

export default function Preloader() {
  const componentRef = useRef(null);

  useEffect(() => {
    const onLoad = (event) => {
      if (componentRef.current) {
        componentRef.current.remove(); // Elimina el nodo DOM del componente
      }
    }
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('load', onLoad);
    }
  }, []);

  return (
    <>
      {/*Preloader*/}
      <div id="preloader" ref={componentRef}></div>
    </>
  );
}