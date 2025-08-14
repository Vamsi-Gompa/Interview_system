// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from "./components/Navbar";
import JobsSection from "./JobsSection";
import Footer from "./components/Footer";

function JobsPage() {
    const username = localStorage.getItem('username');
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                paddingTop: '20px',
                paddingBottom: '40px'
            }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>

                    <JobsSection username={username} />

                </div>
            </div>
            <Footer />
        </>
    );
}

export default JobsPage;
