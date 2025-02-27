import React from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faCalendarDays } from '@fortawesome/free-solid-svg-icons'

import { SectionContent } from "../components/SectionsContent.jsx";

const Education = () => {
    return (
        <>
            <SectionContent title="Experience" description="<TODO>" sectionId="experience">
                <div className="row">
                    {/*Left side */}
                    <div >
                        <div className="experience-timeline-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="experience-item">
                                <div className="icon"><img src="/img/experience/icons/u_tad_logo.jpg"></img></div>
                                <div className="experience-card">
                                    <h4>Master's Degree in Video Game Programming</h4>
                                    <h5>U-tad</h5>
                                    <p><FontAwesomeIcon icon={faCalendarDays} /> October 2020 - October 2021</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> Madrid, Spain (On-Site)</p>
                                    <ul>
                                        <li>C++ programming using Unreal Engine 4.</li>
                                        <li>AI programming in C++.</li>
                                        <li>C++ programming with OpenGL and other utility libraries (GLFW, STB Image, STB TrueType, NoesisGUI).</li>
                                        <li>Audio programming using OpenAL in C++.</li>
                                    </ul>
                                    <Link to="/education/utad" className="button">More details</Link>
                                </div>
                            </div>
                            <div className="experience-item-spacer"></div>
                        </div>

                        <div className="experience-timeline-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="experience-item">
                                <div className="icon"><img src="/img/experience/icons/uji_logo.jpg"></img></div>
                                <div className="experience-card">
                                    <h4>Degree in Video game Design and Development</h4>
                                    <h5>Universitat Jaume I</h5>
                                    <p><FontAwesomeIcon icon={faCalendarDays} /> 2012 - 2016</p>
                                    <p><FontAwesomeIcon icon={faLocationDot} /> Castelló de la Plana, Castelló, Spain (On-Site)</p>
                                    <ul>
                                        <li>Unity 3D.</li>
                                        <li>Algorithms and Data structures.</li>
                                    </ul>
                                    <Link to="/education/uji" className="button">More details</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionContent>
        </>
    );
};

export default Education;