import { React, useEffect, useRef } from "react";

export default function ScrollToTop() {
  const componentRef = useRef(null);

  useEffect(() => {
    const onClick = (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }

    const onToggleScrollTop = (event) => {
      if (componentRef.current) {
        window.scrollY > 100 ? componentRef.current.classList.add('active') : componentRef.current.classList.remove('active');
      }
    }

    window.addEventListener('load', onToggleScrollTop);
    document.addEventListener('scroll', onToggleScrollTop);

    if (componentRef.current)
      componentRef.current.addEventListener('click', onClick);

    return () => {
      if (componentRef.current)
        componentRef.current.removeEventListener('click', onClick);
      window.removeEventListener('load', onToggleScrollTop);
      document.removeEventListener('scroll', onToggleScrollTop);
    }
  }, []);

  return (
    <>
      {/*Scroll Top*/}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center" ref={componentRef}><i className="bi bi-arrow-up-short"></i></a>
    </>
  );
}