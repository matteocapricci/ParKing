import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import theme from '../style/palette.js';
import { colors } from '@mui/material';

const ParkingCard = ({ name, address, rating, price }) => {
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        maxWidth: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        margin: '10px',
    };

    const nameStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: theme.palette.primary.dark
    };

    const addressStyle = {
        color: theme.palette.primary.light,
        marginBottom: '10px',
    };

    const ratingStyle = {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px',
        color: theme.palette.primary.light
    };

    const carValueStyle = {
        color: theme.palette.secondary.dark,
        marginRight: '5px'
    };

    const priceStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: theme.palette.primary.dark
    };

    return (
        <div style={cardStyle}>
            <div style={nameStyle}>{name}</div>
            <div style={addressStyle}>{address}</div>
            <div style={ratingStyle}>
                {[...Array(Math.floor(rating))].map((_, i) => (
                    <FontAwesomeIcon icon={faCar} style={carValueStyle} key={i} />
                ))}
                {rating.toFixed(1)}
            </div>
            <div style={priceStyle}>{`€${price} / hour`}</div>
        </div>
    );
};

export default ParkingCard;