"use client"
import React, { useState } from 'react';

const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const projects = [
        {
            id: 1,
            title: 'Finance',
            category: 'Web development',
            imgSrc: './assets/images/project-1.jpg',
            imgAlt: 'finance',
        },
        {
            id: 2,
            title: 'Orizon',
            category: 'Web development',
            imgSrc: './assets/images/project-2.png',
            imgAlt: 'orizon',
        },
        {
            id: 3,
            title: 'Fundo',
            category: 'Web design',
            imgSrc: './assets/images/project-3.jpg',
            imgAlt: 'fundo',
        },
    ];

    const categories = ['All', 'Web design', 'Applications', 'Web development'];

    const handleFilterClick = (category) => {
        setSelectedCategory(category);
        setDropdownOpen(false);
    };

    const filteredProjects = projects.filter(project =>
        selectedCategory === 'All' || project.category === selectedCategory
    );

    return (
        <>
            <div className="portfolio" data-page="portfolio">
                <header>
                    <h2 className="h2 article-title">Portfolio</h2>
                </header>
                <section className="projects">
                    <ul className="filter-list">
                        {categories.map(category => (
                            <li className="filter-item" key={category}>
                                <button
                                    className={selectedCategory === category ? 'active' : ''}
                                    onClick={() => handleFilterClick(category)}
                                    data-filter-btn=""
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="filter-select-box">
                        <button
                            className={`filter-select ${dropdownOpen ? 'active' : ''}`}
                            data-select=""
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                            <div className="select-value" data-select-value="">
                                {selectedCategory}
                            </div>
                            <div className="select-icon">
                                <ion-icon name="chevron-down" />
                            </div>
                        </button>
                        {dropdownOpen && (
                            <ul className="select-list">
                                {categories.map(category => (
                                    <li className="select-item" key={category}>
                                        <button
                                            data-select-item=""
                                            onClick={() => handleFilterClick(category)}
                                        >
                                            {category}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className="project-list">
                        {filteredProjects.map(project => (
                            <li
                                className="project-item active"
                                data-filter-item=""
                                data-category={project.category.toLowerCase()}
                                key={project.id}
                            >
                                <a href="#">
                                    <figure className="project-img">
                                        <div className="project-item-icon-box">
                                            <ion-icon name="eye-outline" />
                                        </div>
                                        <img
                                            src={project.imgSrc}
                                            alt={project.imgAlt}
                                            loading="lazy"
                                        />
                                    </figure>
                                    <h3 className="project-title">{project.title}</h3>
                                    <p className="project-category">{project.category}</p>
                                </a>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </>
    );
};

export default Portfolio;
