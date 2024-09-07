import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faCalendarPlus, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import {
    input,
    label,
    formContainer,
    heading
} from '../style/styles.js';
import theme from '../style/palette.js';
import { useSelector } from "react-redux";

const ReservationReview = () => {

    const parking = useSelector(state => state.selectedParking.selectedParking)

    const datePickerContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '20px'
    };

    return (
        <div style={formContainer}>
            <h2 style={heading}>Reservation Review</h2>

            <label htmlFor="parkingName" style={label}>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px', color: theme.palette.background.text }} />
                <b>{parking.name}</b>
            </label>

            {/* Indirizzo */}
            <label htmlFor="address" style={label}>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px', color: theme.palette.background.text }} />
                <b>{parking.location.address}</b>
            </label>
            <input 
                type="text" 
                id="address" 
                name="address" 
                value={parking.address} 
                readOnly 
                style={input} 
            />

            <div style={datePickerContainer}>
                {/* Check-in */}
                <div style={{ flex: '1' }}>
                    <label htmlFor="checkIn" style={label}>
                        <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '10px' }} />
                        Check-in:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="checkIn" 
                        name="checkIn" 
                        value={parking.checkIn} 
                        readOnly 
                        style={{ ...input, maxWidth: "190px" }}
                    />
                </div>

                {/* Check-out */}
                <div style={{ flex: '1' }}>
                    <label htmlFor="checkOut" style={label}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{ marginRight: '10px' }} />
                        Check-out:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="checkOut" 
                        name="checkOut" 
                        value={parking.checkOut} 
                        readOnly 
                        style={{ ...input, maxWidth: "190px" }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ReservationReview;
