import { LinearGradient } from "react-text-gradients";

import { LinkPills, LinkPill } from "@components/common/LinkPills";

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
                                <span className={styles["sub"]}>open to new opportunities and offers</span> for{" "}
                                <span>core game systems programmer</span>, <span>tools programmer</span>, <span>porting engineer</span>, and more!
                            </p>
                            <p>
                                I&apos;m graduated in Degree in Video game Design and Development and in the Master&apos;s Degree in Video Game
                                Programming.
                            </p>
                            <p>
                                With <span className={styles["sub"]}>+3 years of professional experience</span> in <span>videogame programming</span>,
                                and <span className={styles["sub"]}>4 years of experience</span> as <span>QA Technician</span>, I bring 7 years of
                                experience in the game industry ready to face any challenge!
                            </p>
                            <p>
                                In this porfolio you will find an extensive explanation of all my personal and professional projects, experience, and
                                formation.
                            </p>
                        </div>
                        <p className={styles["sub-title"]}>More about me</p>
                        <div className={styles["description"]}>
                            <p>
                                I&apos;m {age} years old, still a video game enthusiast and a passionate programmer, fast learner, and self-hosted
                                sysadmin. Some of my Google Spreadsheets are probably more complex than the ones used in accounting companies.
                                <br />
                                <br />
                                <LinearGradient gradient={["to bottom", "#fff100 ,#d96b17"]} className={styles["digimon"]}>
                                    DigiDestinied
                                </LinearGradient>{" "}
                                and <span className={styles["pokemon"]}>Pokémon trainer</span>.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                        <div className={styles["img-container"]}>
                            <img src="/img/home/photo.png" alt="My photo" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <LinkPills className={styles["pill-links"]}>
                        <LinkPill
                            link="mailto:fran.sanchez.rodrigo@gmail.com"
                            iconType="fontawesome"
                            icon="fa-solid fa-envelope"
                            text="fran.sanchez.rodrigo@gmail.com"
                        />
                    </LinkPills>
                </div>
                <div className="row gy-4">
                    <LinkPills className={styles["pill-links"]}>
                        <LinkPill
                            link="https://www.linkedin.com/in/fransanchezrodrigo/"
                            iconType="fontawesome"
                            icon="fa-brands fa-linkedin"
                            text="LinkedIn"
                        />
                        <LinkPill link="https://github.com/Urkaz" iconType="fontawesome" icon="fa-brands fa-github" text="GitHub" />
                        <LinkPill link="https://urkaz.itch.io/" iconType="fontawesome" icon="fa-brands fa-itch-io" text="Itch.io" />
                    </LinkPills>
                </div>
            </div>
        </section>
    );
}
