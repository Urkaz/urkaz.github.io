import React from "react";

import { LinkPills, LinkDot } from "@components/common/LinkPills";

import styles from "@styles/components/Footer.module.scss";

export function Footer({ name }) {
    const buildDate = new Date(process.env.NEXT_PUBLIC_BUILD_DATE);
    const formatter = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: "UTC",
        timeZoneName: "short"
    });
    const formattedDate = formatter.format(buildDate);

    return (
        <>
            {/*Footer*/}
            <footer id={styles["footer"]} className={`${styles["footer"]} dark-background`}>
                <div className="container">
                    <h3 className="sitename">{name}</h3>
                    <LinkPills className={`d-flex justify-content-center ${styles["social-links"]}`}>
                        <LinkDot link="mailto:fran.sanchez.rodrigo@gmail.com" iconType="fontawesome" icon="fa-solid fa-envelope" target="_blank" />
                        <LinkDot link="https://www.linkedin.com/in/fransanchezrodrigo/" iconType="fontawesome" icon="fa-brands fa-linkedin" target="_blank" />
                        <LinkDot link="https://github.com/Urkaz" iconType="fontawesome" icon="fa-brands fa-github" target="_blank" />
                        <LinkDot link="https://urkaz.itch.io/" iconType="fontawesome" icon="fa-brands fa-itch-io" target="_blank" />
                        <LinkDot link="https://www.devuego.es/bd/fpersona/francesc-sanchez-rodrigo" iconType="custom" icon="devuego" target="_blank" />
                    </LinkPills>
                    <div className="container">
                        <div className={styles["credits"]}>
                            Made with React+Next.js by <strong className="px-1 sitename">{name}</strong>.
                            <br />
                            All trademarks, logos, and brand names are the property of their respective owners. Their use on this website is for identification only and does not imply endorsement.
                            <br />
                            Last updated {formattedDate}
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
