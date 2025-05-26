import React from "react";

import { LinkPills, LinkDot } from "@components/common/LinkPills";

import styles from "@styles/components/Footer.module.scss";

export function Footer({ name }) {
    return (
        <>
            {/*Footer*/}
            <footer id={styles["footer"]} className={`${styles["footer"]} dark-background`}>
                <div className="container">
                    <h3 className="sitename">{name}</h3>
                    <LinkPills className={`d-flex justify-content-center ${styles["social-links"]}`}>
                        <LinkDot link="mailto:fran.sanchez.rodrigo@gmail.com" iconType="fontawesome" icon="fa-solid fa-envelope" />
                        <LinkDot link="https://www.linkedin.com/in/fransanchezrodrigo/" iconType="fontawesome" icon="fa-brands fa-linkedin" />
                        <LinkDot link="https://github.com/Urkaz" iconType="fontawesome" icon="fa-brands fa-github" />
                        <LinkDot link="https://urkaz.itch.io/" iconType="fontawesome" icon="fa-brands fa-itch-io" />
                        <LinkDot link="https://www.devuego.es/bd/fpersona/francesc-sanchez-rodrigo" iconType="custom" icon="devuego" />
                    </LinkPills>
                    <div className="container">
                        <div className={styles["credits"]}>
                            Made with React+Next.js by <strong className="px-1 sitename">{name}</strong>.
                            <br />
                            All trademarks, logos, and brand names are the property of their respective owners. Their use on this website is for identification only and does not imply endorsement.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
