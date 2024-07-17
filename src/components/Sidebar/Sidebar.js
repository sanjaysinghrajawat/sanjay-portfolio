"use client"
import React, { useState, useEffect } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CakeIcon from '@mui/icons-material/Cake';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios';
import { sidebarData } from '@/utils/data';

const Sidebar = () => {
    const [isActive, setIsActive] = useState(false);
    // const [sidebarData, setSidebarData] = useState(null);

    // useEffect(() => {
    //     axios.get('/path/to/your/data.json')
    //         .then(response => {
    //             setSidebarData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching sidebar data:', error);
    //         });
    // }, []);

    const toggleSidebar = () => {
        setIsActive(!isActive);
    };

    if (!sidebarData) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <aside className={`sidebar ${isActive ? 'active' : ''}`}>
                <div className="sidebar-info">
                    <figure className="avatar-box">
                        <img
                            src={"./img/my-avatar.jpeg"}
                            alt={"Profile"}
                            width={80}
                            className='rounded-lg'
                        />
                    </figure>
                    <div className="info-content">
                        <h1 className="name" title={sidebarData.name}>
                            {sidebarData.name}
                        </h1>
                        <p className="title">{sidebarData.email}</p>
                    </div>
                    <button className="info_more-btn" data-sidebar-btn="" onClick={toggleSidebar}>
                        <span>{isActive ? 'Hide Contacts' : 'Show Contacts'}</span>
                        <ion-icon name={isActive ? "chevron-up" : "chevron-down"} />
                    </button>
                </div>
                <div className="sidebar-info_more">
                    <div className="separator" />
                    <ul className="contacts-list">
                        <li className="contact-item">
                            <div className="icon-box">
                                <MailIcon />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Email</p>
                                <a href={`mailto:${sidebarData.email}`} className="contact-link">
                                    {sidebarData.email}
                                </a>
                            </div>
                        </li>
                        <li className="contact-item">
                            <div className="icon-box">
                                <LocalPhoneIcon />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Phone</p>
                                <a href={`tel:${sidebarData.phone}`} className="contact-link">
                                    {sidebarData.phone}
                                </a>
                            </div>
                        </li>
                        <li className="contact-item">
                            <div className="icon-box">
                                <CakeIcon />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Birthday</p>
                                <time dateTime={sidebarData.birthday}>{sidebarData.birthday}</time>
                            </div>
                        </li>
                        <li className="contact-item">
                            <div className="icon-box">
                                <LocationOnIcon />
                            </div>
                            <div className="contact-info">
                                <p className="contact-title">Location</p>
                                <address>{sidebarData.location}</address>
                            </div>
                        </li>
                    </ul>
                    <div className="separator" />
                    {/* <ul className="social-list">
                        {sidebarData.socials.map(social => (
                            <li className="social-item" key={social.platform}>
                                <a href={social.link} className="social-link">
                                    <ion-icon name={`logo-${social.platform}`} />
                                </a>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
