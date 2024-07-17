"use client"
import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { database } from '../config/firebase';

const Resume = () => {
    const [resume, setResume] = useState({
        education: [],
        experience: [],
        skills: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(database);
                const snapshot = await get(child(dbRef, 'resume'));
                if (snapshot.exists()) {
                    setResume(snapshot.val());
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="resume">
                <header>
                    <h2 className="h2 article-title">Resume</h2>
                </header>
                <section className="timeline">
                    <div className="title-wrapper">
                        <div className="icon-box">
                            <ion-icon name="book-outline" />
                        </div>
                        <h3 className="h3">Education</h3>
                    </div>
                    <ol className="timeline-list">
                        {resume.education.map((item, index) => (
                            <li className="timeline-item" key={index}>
                                <h4 className="h4 timeline-item-title">{item.title}</h4>
                                <span>{item.year}</span>
                                <p className="timeline-text">{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </section>
                <section className="timeline">
                    <div className="title-wrapper">
                        <div className="icon-box">
                            <ion-icon name="book-outline" />
                        </div>
                        <h3 className="h3">Experience</h3>
                    </div>
                    <ol className="timeline-list">
                        {resume.experience.map((item, index) => (
                            <li className="timeline-item" key={index}>
                                <h4 className="h4 timeline-item-title">{item.title}</h4>
                                <span>{item.year}</span>
                                <p className="timeline-text">{item.description}</p>
                            </li>
                        ))}
                    </ol>
                </section>
                <section className="skill">
                    <h3 className="h3 skills-title">My skills</h3>
                    <ul className="skills-list content-card">
                        {resume.skills.map((item, index) => (
                            <li className="skills-item" key={index}>
                                <div className="title-wrapper">
                                    <h5 className="h5">{item.name}</h5>
                                    <data value={item.level}>{item.level}%</data>
                                </div>
                                <div className="skill-progress-bg">
                                    <div className="skill-progress-fill" style={{ width: `${item.level}%` }} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    )
}

export default Resume;
