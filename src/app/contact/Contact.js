import React from 'react'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {
    return (
        <>
            <div className="contact" data-page="contact">
                <header>
                    <h2 className="h2 article-title">Contact</h2>
                </header>
                <ul className="social-list mb-4 p-5">
                    <li className="social-item">
                        <a href="#" className="social-link">
                            <LinkedInIcon />
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="#" className="social-link">
                            <InstagramIcon />
                        </a>
                    </li>
                    <li className="social-item">
                        <a href="#" className="social-link">
                            <GitHubIcon />
                        </a>
                    </li>
                </ul>
                <section className="contact-form">
                    <h3 className="h3 form-title">Contact Form</h3>
                    <form action="#" className="form" data-form="">
                        <div className="input-wrapper">
                            <input
                                type="text"
                                name="fullname"
                                className="form-input"
                                placeholder="Full name"
                                required=""
                                data-form-input=""
                            />
                            <input
                                type="email"
                                name="email"
                                className="form-input"
                                placeholder="Email address"
                                required=""
                                data-form-input=""
                            />
                        </div>
                        <textarea
                            name="message"
                            className="form-input"
                            placeholder="Your Message"
                            required=""
                            data-form-input=""
                            defaultValue={""}
                        />
                        <button className="form-btn" type="submit" disabled="" data-form-btn="">
                            <ion-icon name="paper-plane" />
                            <span>Send Message</span>
                        </button>
                    </form>
                </section>
            </div>

        </>
    )
}

export default Contact