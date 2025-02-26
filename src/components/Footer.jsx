import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faItchIo } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer({ children }) {
    return (
        <>
            {/*Footer*/}
            <footer id="footer" className="footer dark-background">
                <div className="container">
                    <h3 className="sitename">{children}</h3>
                    <div className="social-links d-flex justify-content-center">
                        <a href="https://www.linkedin.com/in/fransanchezrodrigo/"><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href="https://github.com/Urkaz"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="https://urkaz.itch.io/"><FontAwesomeIcon icon={faItchIo} /></a>
                        <a href="mailto:fran.sanchez.rodrigo@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                    </div>
                    <div className="container">
                        <div className="credits">
                            Design based on <a target="_blank" href="https://bootstrapmade.com/personal-free-resume-bootstrap-template/" rel="noopener noreferrer">Personal</a> from <a target="_blank" href="https://bootstrapmade.com" rel="noopener noreferrer">BootstrapMade</a>.<br />
                            Made with React by <strong className="px-1 sitename">{children}</strong>.
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}