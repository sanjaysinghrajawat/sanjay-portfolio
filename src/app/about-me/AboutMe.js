"use client"
import React, { useState, useEffect } from 'react';
import { ref, get, child } from 'firebase/database';
import { database } from '../config/firebase';

const AboutMe = () => {
    const [aboutMeDesc, setAboutMeDesc] = useState("");
    const [whatIamDoing, setWhatIamDoing] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(database);
                const snapshot = await get(child(dbRef, 'aboutMe'));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setAboutMeDesc(data.aboutMeDesc || "");
                    if (data.whatIamDoing) {
                        setWhatIamDoing(Object.values(data.whatIamDoing));
                    }
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
            <article className="about active" data-page="about">
                <header>
                    <h2 className="h2 article-title">About me</h2>
                </header>
                <section className="about-text">
                    <p>{aboutMeDesc}</p>
                </section>

                <section className="service">
                    <h3 className="h3 service-title">What I'm doing</h3>
                    <ul className="service-list">
                        {whatIamDoing.map((item, index) => (
                            <li className="service-item" key={index}>
                                <div className="service-icon-box">
                                    <img
                                        src="./assets/images/icon-default.svg" // Use a default icon or map item.title to specific icons
                                        alt={` icon`}
                                        width={40}
                                    />
                                </div>
                                <div className="service-content-box">
                                    <h4 className="h4 service-item-title">{item.title}</h4>
                                    <p className="service-item-text">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </>
    )
}

export default AboutMe;
