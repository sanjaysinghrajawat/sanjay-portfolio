"use client"
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ref, set, get, child, update, push } from 'firebase/database';
import { database } from '../config/firebase';

const initialState = {
    aboutMeDesc: "",
    whatIamDoing: {
        title: "",
        desc: "",
    }
}

const Edit = () => {
    const [state, setState] = useState(initialState);
    const [whatIamDoingList, setWhatIamDoingList] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // To track the item being edited
    const { aboutMeDesc, whatIamDoing } = state;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dbRef = ref(database);
                const snapshot = await get(child(dbRef, 'aboutMe'));
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setState(prevState => ({ ...prevState, aboutMeDesc: data.aboutMeDesc }));
                    if (data.whatIamDoing) {
                        setWhatIamDoingList(Object.entries(data.whatIamDoing));
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    const handleWhatIamDoingChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, whatIamDoing: { ...whatIamDoing, [name]: value } });
    }

    const handleEdit = (index) => {
        setEditIndex(index);
        setState(prevState => ({ ...prevState, whatIamDoing: whatIamDoingList[index][1] }));
    }

    const handleDelete = async (key) => {
        try {
            await set(ref(database, `aboutMe/whatIamDoing/${key}`), null);
            setWhatIamDoingList(whatIamDoingList.filter(([k]) => k !== key));
            toast.success("Item deleted successfully");
        } catch (error) {
            toast.error("Error deleting item");
            console.error("Error deleting item: ", error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!aboutMeDesc || !whatIamDoing.title || !whatIamDoing.desc) {
            toast.error("Provide all values in fields");
            return;
        }

        try {
            // Update aboutMeDesc independently
            await update(ref(database, 'aboutMe'), { aboutMeDesc });

            if (editIndex !== null) {
                // Update existing item
                const key = whatIamDoingList[editIndex][0];
                await update(ref(database, `aboutMe/whatIamDoing/${key}`), whatIamDoing);
                setWhatIamDoingList(whatIamDoingList.map(([k, v], i) => i === editIndex ? [k, whatIamDoing] : [k, v]));
                toast.success("Item updated successfully");
            } else {
                // Add new item to whatIamDoing
                const newKey = push(child(ref(database), 'aboutMe/whatIamDoing')).key;
                const updates = {};
                updates[`whatIamDoing/${newKey}`] = whatIamDoing;
                await update(ref(database, 'aboutMe'), updates);
                setWhatIamDoingList([...whatIamDoingList, [newKey, whatIamDoing]]);
                toast.success("Item added successfully");
            }

            // Reset fields after adding or updating
            setState(prevState => ({ ...prevState, whatIamDoing: { title: "", desc: "" } }));
            setEditIndex(null);
        } catch (error) {
            toast.error("Error updating data");
            console.error("Error updating data: ", error);
        }
    }

    return (
        <div className='h-full bg-white'>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    id='aboutMeDesc'
                    name='aboutMeDesc'
                    placeholder='About me...'
                    value={aboutMeDesc}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name='title'
                    placeholder='I am Doing Title'
                    value={whatIamDoing.title}
                    onChange={handleWhatIamDoingChange}
                />
                <input
                    type="text"
                    name='desc'
                    placeholder='I am Doing Description'
                    value={whatIamDoing.desc}
                    onChange={handleWhatIamDoingChange}
                />
                <button type="submit">
                    {editIndex !== null ? "Update" : "Add"}
                </button>
            </form>

            <ul>
                {whatIamDoingList.map(([key, item], index) => (
                    <li key={key}>
                        <p>Title: {item.title}</p>
                        <p>Description: {item.desc}</p>
                        <button onClick={() => handleEdit(index)}>Edit</button>
                        <button onClick={() => handleDelete(key)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Edit;
