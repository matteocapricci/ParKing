import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faCalendarDay, faCalendarPlus, faMotorcycle, faCar, faTruck, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import CustomButton from './CustomButton';
import {
    input,
    label,
    formContainer,
    heading,
} from '../style/styles.js';
import { MarginRounded } from '@mui/icons-material';
import theme from '../style/palette.js';

function DestinationForm() {

    const radioGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
    };

    const radioItemStyle = {
        alignItems: 'center',
        marginRight: '10px',
        cursor: 'pointer',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid ${theme.palette.primary.light}',
        transition: 'background-color 0.3s, border-color 0.3s',
        color: theme.palette.secondary.dark,
    };

    const activeRadioItemStyle = {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.light,
    };

    const radioInputStyle = {
        marginRight: '10px',
    };

    const datePickerContainer = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '20px'
    };

    const [destination, setDestination] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [transport, setTransport] = useState('any');
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    // Funzione chiamata quando si salva il form
    const handleSave = (event) => {
        event.preventDefault();

        if (new Date(dateOut) < new Date(dateIn)) {
            alert("La data di fine non può essere precedente alla data di inizio.");
        } else {
            console.log("Città di destinazione:", destination);
            console.log("Data di inizio:", dateIn);
            console.log("Data di fine:", dateOut);
            console.log("Mezzo di trasporto:", transport);
            // Aggiungi qui la logica per salvare i dati, come una chiamata API
        }
    };

    const searchButton = {
        name: 'Search',
        backgroundColor: isButtonHovered ? theme.palette.primary.dark : theme.palette.primary.main,
        color: theme.palette.secondary.light,
        border: theme.palette.primary.dark,
        borderRadius: '4px',
        padding: '20px 60px',
        fontSize: '20px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    };

    

    return (
        <div style={formContainer}>
            <h2 style={heading}>Look for your place</h2>
            <label htmlFor="destination" style={label}>
                <FontAwesomeIcon icon={faLocationDot} style={{ marginRight: '10px', color: theme.palette.background.text }} />
                Destination:
            </label>
            <input 
                type="text" 
                id="destination" 
                name="destination" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                required 
                style={input} 
            />

            <div style={datePickerContainer}>
                <div style={{ flex: '1' }}>
                    <label htmlFor="dateIn" style={label}>
                        <FontAwesomeIcon icon={faCalendarDay} style={{ marginRight: '10px' }} />
                        Check-in:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="dateIn" 
                        name="dateIn" 
                        value={dateIn} 
                        onChange={(e) => setDateIn(e.target.value)} 
                        required 
                        style={{ ...input, maxWidth: "190px" }}
                    />
                </div>
                <div style={{ flex: '1' }}>
                    <label htmlFor="dateOut" style={label}>
                        <FontAwesomeIcon icon={faCalendarPlus} style={{ marginRight: '10px' }} />
                        Check-out:
                    </label>
                    <input 
                        type="datetime-local" 
                        id="dateOut" 
                        name="dateOut" 
                        value={dateOut} 
                        onChange={(e) => setDateOut(e.target.value)} 
                        required 
                        style={{ ...input, maxWidth: "190px" }}
                    />
                </div>
            </div>

            <label style={label}>
                <FontAwesomeIcon icon={faWandSparkles} style={{ marginRight: '10px' }} />
                Vehicol size:
            </label>
            <div style={radioGroupStyle}>
                <div 
                    style={{ ...radioItemStyle, ...(transport === 'any' ? activeRadioItemStyle : {}) }} 
                    onClick={() => setTransport('any')}
                >
                    <FontAwesomeIcon icon={faWandSparkles} style={radioInputStyle} />
                    All
                </div>
                <div 
                    style={{ ...radioItemStyle, ...(transport === 'moto' ? activeRadioItemStyle : {}) }} 
                    onClick={() => setTransport('moto')}
                >
                    <FontAwesomeIcon icon={faMotorcycle} style={radioInputStyle} />
                    Moto
                </div>
                <div 
                    style={{ ...radioItemStyle, ...(transport === 'car' ? activeRadioItemStyle : {}) }} 
                    onClick={() => setTransport('car')}
                >
                    <FontAwesomeIcon icon={faCar} style={radioInputStyle} />
                    Car
                </div>
                <div 
                    style={{ ...radioItemStyle, ...(transport === 'truck' ? activeRadioItemStyle : {}) }} 
                    onClick={() => setTransport('truck')}
                >
                    <FontAwesomeIcon icon={faTruck} style={radioInputStyle} />
                    Truck
                </div>
            </div>

            <div className="form-container">
            
        </div>

            <button 
                type="submit" 
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                style={searchButton}
            >
                Search
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '10px' }} />
            </button>
        </div>
    );
};

export default DestinationForm;
