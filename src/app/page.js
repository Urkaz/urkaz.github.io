import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin, faItchIo } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { LinearGradient } from "react-text-gradients";

import styles from "@styles/pages/home.module.scss";

export default function Home() {
    var diff_ms = new Date().getTime() - new Date(Date.UTC(1994, 1, 12)).getTime(); //Future date - current date
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    return (
        <section id={styles["hero"]} className={`${styles["hero"]} section dark-background`}>
            {/*<img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />*/}
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
                <div className="row">
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                        <h2>Fran Sánchez Rodrigo</h2>
                        <p className={styles["sub-title"]}>Video game Programmer</p>
                        <div className={styles["description"]}>
                            <p>
                                Hello and welcome to my porfolio! My name is Fran Sánchez Rodrigo, and I&apos;m currently{" "}
                                <span className={styles["sub"]}>open to new opportunities and offers</span> for <span>game systems programmer</span>,{" "}
                                <span>tools programmer</span>, <span>porting engineer</span>, and more!
                            </p>
                            <p>
                                I&apos;m graduated in Degree in Video game Design and Development and in the Master&apos;s Degree in Video Game
                                Programming.
                            </p>
                            <p>
                                With <span className={styles["sub"]}>+3 years of experience</span> in <span>videogame programming</span>, and{" "}
                                <span className={styles["sub"]}>4 years of experience</span> as <span>QA Technician</span>, I bring 7 years of
                                experience and a variety of personal projects, ready to face any challenge!
                            </p>
                        </div>
                        <p className={styles["sub-title"]}>More about me</p>
                        <div className={styles["description"]}>
                            <p>
                                I&apos;m {age} years old, still a video game enthusiast and a passionate programmer that loves new technologies.
                                <br />
                                <LinearGradient gradient={["to bottom", "#fff100 ,#d96b17"]} className={styles["digimon"]}>
                                    DigiDestinied
                                </LinearGradient> and <span className={styles["pokemon"]}>Pokémon trainer</span>.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                        <div className={styles["img-container"]}>
                            <img src="/img/home/photo.png" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className={styles["social-links"]}>
                        <a target="_blank" href="mailto:fran.sanchez.rodrigo@gmail.com" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faEnvelope} /> fran.sanchez.rodrigo@gmail.com
                        </a>
                    </div>
                </div>
                <div className="row gy-4">
                    <div className={styles["social-links"]}>
                        <a target="_blank" href="https://www.linkedin.com/in/fransanchezrodrigo/" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                            LinkedIn
                        </a>
                        <a target="_blank" href="https://github.com/Urkaz" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} /> GitHub
                        </a>
                        <a target="_blank" href="https://urkaz.itch.io/" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faItchIo} /> Itch.io
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
