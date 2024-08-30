import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faLocationDot, faCalendarDay, faCalendarPlus, faMotorcycle, faCar, faTruck, faWandSparkles } from '@fortawesome/free-solid-svg-icons';
import {
    input,
    label,
    formContainer,
    heading,
    error
} from '../style/styles.js';
import theme from '../style/palette.js';

const DestinationForm = () => {
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
      border: `1px solid ${theme.palette.primary.light}`,
      transition: 'background-color 0.3s, border-color 0.3s',
      color: theme.palette.secondary.dark
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
  const [suggestions, setSuggestions] = useState([]); // Stato per i suggerimenti delle città
  const [dateIn, setDateIn] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [transport, setTransport] = useState('any');
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [destinationError, setDestinationError] = useState('')
  const [dateError, setDateError] = useState('')

  // Funzione per gestire la ricerca dei suggerimenti
  const handleSearch = (query) => {
    if (query.length > 2) { // Effettua la ricerca solo se ci sono almeno 3 caratteri
      const apiKey = 'e31b8aeff2e348c5871cb9aec2b7739f'; // Sostituisci con la tua chiave API Geoapify
      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${apiKey}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.features); // Imposta i suggerimenti dallo schema dei dati Geoapify
        })
        .catch((error) => {
          console.error('Errore nella ricerca della città:', error);
        });
    } else {
      setSuggestions([]);
    }
  };

  // Funzione per gestire la selezione di un suggerimento
  const handleSelectSuggestion = (suggestion) => {
    setDestination(suggestion.properties.formatted); // Imposta il nome del luogo selezionato
    setSuggestions([]); // Pulisce i suggerimenti dopo la selezione
  };

  // Funzione chiamata quando si salva il form
  const handleSave = (event) => {
    event.preventDefault();
    setDestinationError('');
    setDateError('');
    
    let hasError = false;

    if (!destination.trim()) {
        setDestinationError('Destination is required.');
        hasError = true;
    } else if (!dateIn.trim()) {
        setDateError("Check-in date is required");
        hasError = true;
    } else if (!dateOut.trim()) {
        setDateError("Check-out date is required");
        hasError = true;
    } else if (new Date(dateIn) > new Date(dateOut)) {
        setDateError("Check-in date cannot be earlier than check-out date");
        hasError = true;
    }
  
    // Prevent form submission if there are errors
    if (hasError) {
        return;
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
      <div style={{ position: 'relative' }}>
        <input 
          type="text" 
          id="destination" 
          name="destination" 
          value={destination} 
          onChange={(e) => {
            setDestination(e.target.value);
            handleSearch(e.target.value); // Cerca i suggerimenti mentre si digita
          }} 
          required 
          style={input} 
        />
        {destinationError && <p style={error}>{destinationError}</p>}

        {/* Mostra i suggerimenti */}
        {suggestions.length > 0 && (
          <ul style={{
            listStyleType: 'none',
            padding: '0',
            margin: '4px 0',
            border: '1px solid #ccc', // Bordo esterno
            borderRadius: '4px',
            backgroundColor: 'white',
            position: 'absolute',
            width: '100%',
            maxHeight: '150px', // Imposta l'altezza massima per la lista
            overflowY: 'auto', // Abilita lo scrolling verticale
            boxSizing: 'border-box', // Assicura che il padding non influisca sulla larghezza
            zIndex: 1000,
            color: theme.palette.primary.main
          }}>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => handleSelectSuggestion(suggestion)} 
                style={{
                  padding: '8px',
                  cursor: 'pointer',
                  borderBottom: index !== suggestions.length - 1 ? '1px solid #ccc' : 'none',
                  border: '1px solid #ccc', // Bordo interno per ciascun suggerimento
                }}
              >
                {suggestion.properties.formatted}
              </li>
            ))}
          </ul>
        )}
      </div>

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
      {dateError && <p style={error}>{dateError}</p>}

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

      <button 
        type="submit" 
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        style={searchButton}
        onClick={handleSave}
      >
        Search
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: '10px' }} />
      </button>
    </div>
  );
}

export default DestinationForm;
