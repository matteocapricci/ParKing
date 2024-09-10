import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';

const NotFound = () => {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: '#f8f9fa', // Light gray background
        color: '#343a40' // Dark gray text
    };

    const headingStyle = {
        fontSize: '4rem',
        margin: '0',
        fontWeight: 'bold'
    };

    const subheadingStyle = {
        fontSize: '1.5rem',
        margin: '0.5rem 0',
    };

    const linkStyle = {
        color: '#3498db',
        textDecoration: 'none',
        fontSize: '1.2rem',
        marginTop: '1rem',
        fontWeight: 'bold'
    };

    const imageStyle = {
        width: '150px',
        height: 'auto', 
        marginBottom: '1rem'
    };

    return (
        <div>
            <Header page={"notfound"} />
            <PageContainer>
                <img src="/logos/ParKing_Text.png" alt="ParKing" style={imageStyle} />
                <h1 style={headingStyle}>404</h1>
                <h2 style={subheadingStyle}>Page Not Found</h2>
                <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
                <Link to="/" style={linkStyle}>Go back to Home</Link>
            </PageContainer>
            <Footer />
        </div>
    );
};

export default NotFound;
