import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

export default function Footer({ children }) {
    return (
        <>
            {/*Footer*/}
            <footer id="footer" className="footer dark-background">
                <div className="container">
                    <h3 className="sitename">{children}</h3>
                    <div className="social-links d-flex justify-content-center">
                        <a href=""><FontAwesomeIcon icon={faLinkedin} /></a>
                        <a href=""><FontAwesomeIcon icon={faGithub} /></a>
                        <a href=""><FontAwesomeIcon icon={faEnvelope} /></a>
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