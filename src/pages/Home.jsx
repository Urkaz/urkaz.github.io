import React from "react";

import { SectionContent } from "../components/SectionsContent.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin, faItchIo } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
    var diff_ms = new Date().getTime() - new Date("February 12, 1994").getTime();    //Future date - current date
    var age_dt = new Date(diff_ms);
    var age = Math.abs(age_dt.getUTCFullYear() - 1970);

    return (
        <section id="hero" className="hero section dark-background">
            <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />
            <div className="container" data-aos="zoom-out" data-aos-delay="100">
                <h2>Fran Sánchez Rodrigo</h2>
                <p className="sub-title">Video game Programmer</p>
                <div className="description">
                    <p>Hello and welcome to my porfolio! My name is Fran Sánchez Rodrigo, and I'm currently <span className="sub">open to new opportunities and offers</span> for <span>game systems programmer</span>, <span>tools programmer</span>, <span>porting engineer</span>, and more!</p>
                    <p>I'm graduated in <span>Degree in Video game Design and Development</span> and in the <span>Master's Degree in Video Game Programming</span>.</p>
                    <p>With <span className="sub">+3 years of experience in videogame programming</span>, other <span className="sub">4 years of experience as QA Technician</span>, and <span className="sub">multiple personal projects</span> released, I'm ready to overcome whatever challenge you may throw to me!</p>
                </div>
                <p className="sub-title">More about me</p>
                <div className="description">
                    <p>I'm {age} years old, and a video game enthusiast and a passionate programmer that loves new technologies. DigiDestinied, Pokémon trainer and D&D game master.</p>
                </div>
                <div className="social-links">
                    <a target="_blank" href="https://www.linkedin.com/in/fransanchezrodrigo/"><FontAwesomeIcon icon={faLinkedin} /></a>
                    <a target="_blank" href="https://github.com/Urkaz"><FontAwesomeIcon icon={faGithub} /></a>
                    <a target="_blank" href="https://urkaz.itch.io/"><FontAwesomeIcon icon={faItchIo} /></a>
                    <a target="_blank" href="mailto:fran.sanchez.rodrigo@gmail.com"><FontAwesomeIcon icon={faEnvelope} /></a>
                </div>
            </div>
        </section>
    );
};

export default Home;