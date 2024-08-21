import React, { useState } from 'react';
import CustomButton from './CustomButton';

function DestinationForm() {

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: '0 auto',
    };

    const labelStyle = {
        fontSize: '1.2rem',
        marginBottom: '10px',
        color: '#333',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem',
        marginBottom: '20px',
        transition: 'border-color 0.3s ease',
    };

    const radioGroupStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: '20px',
    };

    const radioItemStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    const radioInputStyle = {
        marginRight: '5px',
    };

    const buttonStyle = {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    // Stati per memorizzare i valori del form
    const [destination, setDestination] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [transport, setTransport] = useState('any');
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const searchButton = {
        name: "Cerca",
        size: "large",
        variant: "contained"
        //handleClick: ()=>{navigate("/")}
    };

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

    return (
        <form style={containerStyle} onSubmit={handleSave}>
            <label htmlFor="destination" style={labelStyle}>Città di destinazione:</label>
            <input 
                type="text" 
                id="destination" 
                name="destination" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                required 
                style={inputStyle} 
            />

            <label htmlFor="dateIn" style={labelStyle}>Data di inizio:</label>
            <input 
                type="date" 
                id="dateIn" 
                name="dateIn" 
                value={dateIn} 
                onChange={(e) => setDateIn(e.target.value)} 
                required 
                style={inputStyle}
            />

            <label htmlFor="dateOut" style={labelStyle}>Data di fine:</label>
            <input 
                type="date" 
                id="dateOut" 
                name="dateOut" 
                value={dateOut} 
                onChange={(e) => setDateOut(e.target.value)} 
                required 
                style={inputStyle}
            />

            <label style={labelStyle}>Scegli il mezzo di trasporto:</label>
            <div style={radioGroupStyle}>
                <label style={radioItemStyle}>
                    <input 
                        type="radio" 
                        name="transport" 
                        value="any" 
                        checked={transport === 'any'} 
                        onChange={(e) => setTransport(e.target.value)} 
                        style={radioInputStyle}
                    />
                    Qualsiasi mezzo
                </label>
                <label style={radioItemStyle}>
                    <input 
                        type="radio" 
                        name="transport" 
                        value="moto" 
                        checked={transport === 'moto'} 
                        onChange={(e) => setTransport(e.target.value)} 
                        style={radioInputStyle}
                    />
                    Moto
                </label>
                <label style={radioItemStyle}>
                    <input 
                        type="radio" 
                        name="transport" 
                        value="auto" 
                        checked={transport === 'auto'} 
                        onChange={(e) => setTransport(e.target.value)} 
                        style={radioInputStyle}
                    />
                    Auto
                </label>
                <label style={radioItemStyle}>
                    <input 
                        type="radio" 
                        name="transport" 
                        value="truck" 
                        checked={transport === 'truck'} 
                        onChange={(e) => setTransport(e.target.value)} 
                        style={radioInputStyle}
                    />
                    Camion
                </label>
            </div>

            <CustomButton 
                type="submit" 
                onMouseEnter={() => setIsButtonHovered(true)}
                onMouseLeave={() => setIsButtonHovered(false)}
                {...searchButton}
            />
        </form>
    );
}

export default DestinationForm;
