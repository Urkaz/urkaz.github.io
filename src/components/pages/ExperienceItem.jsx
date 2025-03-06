import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import styles from "@styles/pages/experience.module.scss";

export const ExperienceItem = ({ children }) => {
    return (
        <>
            {/*Footer*/}
            <footer id={styles["footer"]} className={`${styles["footer"]} dark-background`}>
                <div className="container">
                    <h3 className="sitename">{children}</h3>
                    <div className={`${styles["social-links"]} d-flex justify-content-center`}>
                        <a target="_blank" href="https://www.linkedin.com/in/fransanchezrodrigo/">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a target="_blank" href="https://github.com/Urkaz">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a target="_blank" href="https://urkaz.itch.io/">
                            <FontAwesomeIcon icon={faItchIo} />
                        </a>
                        <a target="_blank" href="mailto:fran.sanchez.rodrigo@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                    <div className="container">
                        <div className={styles["credits"]}>
                            Design based on{" "}
                            <a target="_blank" href="https://bootstrapmade.com/personal-free-resume-bootstrap-template/" rel="noopener noreferrer">
                                Personal
                            </a>{" "}
                            from{" "}
                            <a target="_blank" href="https://bootstrapmade.com" rel="noopener noreferrer">
                                BootstrapMade
                            </a>
                            .<br />
                            Made with React+Next.js by <strong className="px-1 sitename">{children}</strong>.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
