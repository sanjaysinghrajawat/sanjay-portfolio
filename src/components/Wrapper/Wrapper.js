"use client"
import React from 'react'
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import EditAboutMe from '@/app/edit-about-me/Edit';
import EditResume from '@/app/edit-resume/Edit';

const Wrapper = ({ children }) => {

    const pathname = usePathname();
    if (pathname == "/edit-about-me") {
        return <>
            <EditAboutMe />
            <ToastContainer />
        </>
    }
    if (pathname == "/edit-resume") {
        return <>
            <EditResume />
            <ToastContainer />
        </>
    }
    return (
        <main>
            <Sidebar />
            <div className="main-content">
                <Navbar />
                {children}
            </div>
        </main>
    )
}

export default Wrapper