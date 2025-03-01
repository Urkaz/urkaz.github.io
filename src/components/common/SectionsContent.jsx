import React from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";

export function Breadcrumbs() {
    return (
        <>
            {/*Heading container*/}
            <nav className="breadcrumbs">
                <div className="container">
                    <ol>
                        <li>
                            <Link href="/">
                                <FontAwesomeIcon icon={faHouseChimney} /> Home
                            </Link>
                        </li>
                        <li className="current">&lt;TODO&gt;</li>
                    </ol>
                </div>
            </nav>
        </>
    );
}

export function Heading({ title, description }) {
    return (
        <>
            {/*Heading container*/}
            <div className="heading">
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-lg-8">
                            {title ? <h1>{title}</h1> : null}
                            {description ? <p className="mb-0">{description}</p> : null}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function SectionContent({ title, description, sectionId, children }) {
    return (
        <>
            <div className="page-title" data-aos="fade">
                <Breadcrumbs />
                <Heading title={title} description={description} />
                <section id={sectionId} className={`${sectionId} section`}>
                    <div className="container">{children}</div>
                </section>
            </div>
        </>
    );
}
