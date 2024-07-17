"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ref, set, push, get, child, update } from 'firebase/database';
import { database } from '../config/firebase';

const initialState = {
    education: [
        {
            title: "",
            year: "",
            description: "",
        }
    ],
    experience: [
        {
            title: "",
            year: "",
            description: "",
        }
    ],
    skills: [
        {
            name: "",
            level: "",
        }
    ],
};

const EditResume = () => {
    const [state, setState] = useState(initialState);
    const { education, experience, skills } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(database);
                const snapshot = await get(child(dbRef, 'resume'));
                if (snapshot.exists()) {
                    setState(snapshot.val());
                } else {
                    console.log("No data available");
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const handleChange = (section, index, e) => {
        const { name, value } = e.target;
        const updatedSection = state[section].map((item, i) => i === index ? { ...item, [name]: value } : item);
        setState({ ...state, [section]: updatedSection });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await set(ref(database, 'resume'), state);
            toast.success("Data updated successfully");
        } catch (error) {
            toast.error("Error updating data");
            console.error("Error updating data: ", error);
        }
    };

    const addField = (section) => {
        setState({ ...state, [section]: [...state[section], { title: "", year: "", description: "" }] });
    };

    return (
        <div className='h-full bg-white'>
            <form onSubmit={handleSubmit}>
                <h3>Education</h3>
                {education.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name='title'
                            placeholder='Title'
                            value={item.title}
                            onChange={(e) => handleChange('education', index, e)}
                        />
                        <input
                            type="text"
                            name='year'
                            placeholder='Year'
                            value={item.year}
                            onChange={(e) => handleChange('education', index, e)}
                        />
                        <textarea
                            name='description'
                            placeholder='Description'
                            value={item.description}
                            onChange={(e) => handleChange('education', index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => addField('education')}>Add Education</button>

                <h3>Experience</h3>
                {experience.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name='title'
                            placeholder='Title'
                            value={item.title}
                            onChange={(e) => handleChange('experience', index, e)}
                        />
                        <input
                            type="text"
                            name='year'
                            placeholder='Year'
                            value={item.year}
                            onChange={(e) => handleChange('experience', index, e)}
                        />
                        <textarea
                            name='description'
                            placeholder='Description'
                            value={item.description}
                            onChange={(e) => handleChange('experience', index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => addField('experience')}>Add Experience</button>

                <h3>Skills</h3>
                {skills.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name='name'
                            placeholder='Skill Name'
                            value={item.name}
                            onChange={(e) => handleChange('skills', index, e)}
                        />
                        <input
                            type="text"
                            name='level'
                            placeholder='Skill Level'
                            value={item.level}
                            onChange={(e) => handleChange('skills', index, e)}
                        />
                    </div>
                ))}
                <button type="button" onClick={() => addField('skills')}>Add Skill</button>

                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default EditResume;
