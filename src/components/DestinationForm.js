import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setDateIn, setDateOut, setTransport, setLatitude, setLongitude, setSearchedParkings, setNewSearch, resetSelectedParkingForMap } from '../store/App.js';
import { load_parkingNearSerchedPosition } from '../services/firebase/persistenceManager.js';

const DestinationForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [suggestions, setSuggestions] = useState([]);
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [destinationError, setDestinationError] = useState('');
    const [dateError, setDateError] = useState('');

    const destination = useSelector((state) => state.setDestinationFormField.destination);
    const dateIn = useSelector(state => state.setDestinationFormField.dateIn);
    const dateOut = useSelector(state => state.setDestinationFormField.dateOut);
    const transport = useSelector(state => state.setDestinationFormField.transport);

    let lat = useSelector(state => state.setDestinationFormField.lat);
    let lon = useSelector(state => state.setDestinationFormField.lon);

    const parks = {
        "doc_id": "parking_003",
        "nome": "Parcheggio N3",
        "descrizione": "Secure and affordable parking in the heart of the city, within walking distance to major attractions and shopping centers.",
        "location": {
          "address": "Via Fontanelle",
          "city": "Metropolis",
          "state": "NY",
          "postal_code": "10001",
          "latitude": 42.399613,
          "longitude": 14.1959269
        },
        "timePrice": 7.00,
        "parkingSlots": [
            {name:'Car1', size: 'Car'},
            {name:'Car2', size: 'Car'}
        ],
        "services":[
            {name:'Car Wash', price: 20.00}, 
            {name:'Valet Parking', price: 50.00},
            {name:'Helmet Storage',price: 40.00}, 
            {name:'Bike Wash', price: 80.00}
        ],
        "photo_urls": [
          "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
          "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ]
      } 

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
        transition: 'background-color 0.3s, border-color 0.3s',
        color: theme.palette.secondary.dark
    };

    const activeRadioItemStyle = {
        backgroundColor: theme.palette.secondary.main,
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

    // Function to handle search suggestions
    const handleSearch = (query) => {
        if (query.length > 2) { // Only search if there are at least 3 characters
            const apiKey = 'e31b8aeff2e348c5871cb9aec2b7739f'; // Replace with your Geoapify API key
            const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&apiKey=${apiKey}`;

            fetch(url)
                .then((response) => response.json())
                    .then((data) => {
                        setSuggestions(data.features); // Set suggestions from Geoapify data schema
                    })
                    .catch((error) => {
                        console.error('Error searching for city:', error);
                    });
        } else {
            setSuggestions([]);
        }
    };

    // Function to handle suggestion selection
    const handleSelectSuggestion = (suggestion) => {
        dispatch(setDestination(suggestion.properties.formatted));
        dispatch(setLatitude(suggestion.properties.lat));
        dispatch(setLongitude(suggestion.properties.lon));
        setSuggestions([]);
    };

    const retriveParkingList = async () => {
        let retrivedParking = []; 
        try {
            retrivedParking = await load_parkingNearSerchedPosition(lat, lon, transport, dateIn, dateOut, null);
            console.log(retrivedParking)
            dispatch(setSearchedParkings(retrivedParking))
        } catch (e) {
            console.log("ERRORE")
        }
    }

    // Function called when the form is submitted
    const handleSave = async (event) => {
        event.preventDefault();
        setDestinationError('');
        setDateError('');
        
        let hasError = false;

        if (!destination.trim()) {
            setDestinationError('Destination is required.');
            hasError = true;
        } else if (destination.length < 3) {
            setDestinationError("Please enter at least 3 characters for suggestions");
            hasError = true;
        } else if (lon === '' || lat === '') {
            setDestinationError("Please choose one of the suggestions listed");
            hasError = true;
        } else if (!dateIn.trim()) {
            setDateError("Check-in date is required");
            hasError = true;
        } else if (!dateOut.trim()) {
            setDateError("Check-out date is required");
            hasError = true;
        } else if (new Date(dateIn) > new Date(dateOut)) {
            setDateError("Check-in date cannot be later than check-out date");
            hasError = true;
        }

        if (hasError) {
            return;
        } else {
            retriveParkingList();
            dispatch(setNewSearch());
            dispatch(resetSelectedParkingForMap())
            navigate("/resultList");
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
                dispatch(setDestination(e.target.value));
                handleSearch(e.target.value); // Search suggestions while typing
            }} 
            required 
            style={input} 
            />
            {destinationError && <p style={error}>{destinationError}</p>}

            {/* Display suggestions */}
            {suggestions.length > 0 && (
            <ul style={{
                listStyleType: 'none',
                padding: '0',
                margin: '4px 0',
                border: '1px solid #ccc', // Outer border
                borderRadius: '4px',
                backgroundColor: 'white',
                position: 'absolute',
                width: '100%',
                maxHeight: '150px', // Max height for list
                overflowY: 'auto', // Enable vertical scrolling
                boxSizing: 'border-box', // Ensure padding doesn't affect width
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
                    border: '1px solid #ccc', // Inner border for each suggestion
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
                onChange={(e) => dispatch(setDateIn(e.target.value))} 
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
                onChange={(e) => dispatch(setDateOut(e.target.value))} 
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
            onClick={() => dispatch(setTransport('any'))}
            >
            <FontAwesomeIcon icon={faWandSparkles} style={radioInputStyle} />
            All
            </div>
            <div 
            style={{ ...radioItemStyle, ...(transport === 'moto' ? activeRadioItemStyle : {}) }} 
            onClick={() => dispatch(setTransport('moto'))}
            >
            <FontAwesomeIcon icon={faMotorcycle} style={radioInputStyle} />
            Moto
            </div>
            <div 
            style={{ ...radioItemStyle, ...(transport === 'car' ? activeRadioItemStyle : {}) }} 
            onClick={() => dispatch(setTransport('car'))}
            >
            <FontAwesomeIcon icon={faCar} style={radioInputStyle} />
            Car
            </div>
            <div 
            style={{ ...radioItemStyle, ...(transport === 'truck' ? activeRadioItemStyle : {}) }} 
            onClick={() => dispatch(setTransport('truck'))}
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
