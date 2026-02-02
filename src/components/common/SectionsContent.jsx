import React from "react";

import { Breadcrumb } from "@components/common/Breadcrumb";

import styles from "@styles/components/SectionsContent.module.scss";

export function Heading({ title, description }) {
    return (
        <>
            {/*Heading container*/}
            <div className="heading">
                <div className="container">
                    <div className="row d-flex justify-content-center text-center">
                        <div className="col-lg">
                            {title ? <h1>{title}</h1> : null}
                            {description ? <p className={`mb-0 ${styles["description"]}`}>{description}</p> : null}
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
                <Breadcrumb />
                <Heading title={title} description={description} />
                <section id={sectionId} className={`${sectionId} section`}>
                    <div className="container">{children}</div>
                </section>
            </div>
        </>
    );
}
