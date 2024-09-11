import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import theme from '../style/palette';

const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    color: theme.palette.secondary.dark
};

const carValueStyle = {
    color: theme.palette.secondary.dark,
    marginRight: '5px'
};

const CarRating = ({ rating }) => {
    if (rating === 0) {
        return (
            <div style={ratingStyle}>
                <FontAwesomeIcon icon={faCar} style={{ ...carValueStyle, opacity: 0.2 }} />
                <span>No reviews yet</span>
            </div>
        );
    }

    const fullCars = Math.floor(rating);
    const halfCar = rating % 1 >= 0.5;
    const emptyCars = 5 - fullCars - (halfCar ? 1 : 0);

    return (
        <div style={ratingStyle}>
            {[...Array(fullCars)].map((_, index) => (
                <FontAwesomeIcon icon={faCar} style={carValueStyle} key={`full-${index}`} />
            ))}
            {halfCar && (
                <FontAwesomeIcon icon={faCar} style={{ ...carValueStyle, opacity: 0.5 }} key="half" />
            )}
            {[...Array(emptyCars)].map((_, index) => (
                <FontAwesomeIcon icon={faCar} style={{ ...carValueStyle, opacity: 0.2 }} key={`empty-${index}`} />
            ))}
            <span>{rating.toFixed(1)}</span>
        </div>
    );
};

export default CarRating;
