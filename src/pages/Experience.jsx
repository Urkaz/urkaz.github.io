import React from "react";

import SectionContent from "../components/SectionsContent.jsx";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

const Experience = () => {
    return (
        <>
            <SectionContent title="Experience" description="<TODO>" sectionId="experience">
                <div className="row">
                    {/*Left side */}
                    <div >
                        <h3 className="experience-title">Professional Experience</h3>

                        <div className="experience-timeline-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="experience-item">
                                <div className="icon"><img src="/img/experience/icons/catness_game_studios_logo.jpg"></img></div>
                                <div className="experience-card">
                                    <h4>Unreal Tools Programmer & Porting Engineer</h4>
                                    <h5>Catness Game Studios</h5>
                                    <p><FontAwesomeIcon icon={faCalendarDays} /> December 2021 - March 2025 (3 years 3 months)</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> Catelló de la Plana, Castelló, Spain (In-office)</p>
                                    <ul>
                                        <li>Game porting with Unreal Engine 4 and 5 to consoles (Xbox One, Xbox Series S|X, PS4, PS5, Switch, Steam Deck).</li>
                                        <li>Plugin and tool development to expand the engine base functionality: custom device profiles, mesh instancing editor tools, project analysis tools, custom blueprint nodes, async loading screen, right-click editor extensions with custom tasks, and more.</li>
                                        <li>Plugin and tool development to ease the porting process to consoles: Xbox user management, PS5 activities, Switch controller handling, and other optimization tools.</li>
                                        <li>Engine customizations with multiple bug fixes and improvements.</li>
                                    </ul>
                                    <a className="button">More details</a>
                                </div>
                            </div>
                            <div className="experience-item-spacer"></div>
                        </div>

                        <div className="experience-timeline-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="experience-item">
                                <div className="icon"><img src="/img/experience/icons/lollipop_robot_logo.jpg"></img></div>
                                <div className="experience-card">
                                    <h4>QA Technician</h4>
                                    <h5>Lollipop Robot</h5>
                                    <p><FontAwesomeIcon icon={faCalendarDays} /> October 2016 - September 2020 (4 years)</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> Vila-real, Castelló, Spain - In-office</p>
                                    <ul>
                                        <li>Compliance and Playtesting for PS4, Xbox One, and Nintendo Switch.</li>
                                        <li>Designer support of the porting development for the platforms above.</li>
                                        <li>Experience using popular bug trackers like Jira, Mantis, Bitbucket, or GitHub.</li>
                                        <li>Creating and maintaining tools to ease the tests (cmd scripts, input macros, etc).</li>
                                    </ul>
                                    <a className="button">More details</a>
                                </div>
                            </div>
                            <div className="experience-item-spacer"></div>
                        </div>

                        <div className="experience-timeline-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="experience-item pb-0">
                                <div className="icon"><img src="/img/experience/icons/lollipop_robot_logo.jpg"></img></div>
                                <div className="experience-card">
                                    <h4>QA Tester Internship</h4>
                                    <h5>Lollipop Robot</h5>
                                    <p><FontAwesomeIcon icon={faCalendarDays} /> February 2016 - July 2016 (6 months)</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> Vila-real, Castelló, Spain - In-office</p>
                                    <ul>
                                        <li>Playtesting for console games.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContent>
        </>
    );
};

export default Experience;