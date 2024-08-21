import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const SearchBox = ({ onSearch, suggestions, onSelectSuggestion }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '10px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Cerca una città"
          style={{
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            width: '80%',
            marginRight: '10px',
          }}
        />
        <button type="submit" style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#007BFF', color: 'white' }}>
          Cerca
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul style={{
          listStyleType: 'none',
          padding: '0',
          margin: '4px 0',
          border: '1px solid #ccc',
          borderRadius: '4px',
          backgroundColor: 'white',
          position: 'absolute',
          width: '80%',
          zIndex: 1000,
        }}>
          {suggestions.map((suggestion, index) => (
            <li 
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              style={{
                padding: '8px',
                cursor: 'pointer',
                borderBottom: index !== suggestions.length - 1 ? '1px solid #ccc' : 'none'
              }}
            >
              {suggestion.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]); // Posizione di default (Londra)
  const [userLocation, setUserLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const mapRef = useRef();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setPosition([latitude, longitude]);

          // Centrare la mappa sulla posizione attuale
          if (mapRef.current) {
            mapRef.current.setView([latitude, longitude], 13);
          }
        },
        (error) => {
          console.error("Errore nella geolocalizzazione:", error);
        }
      );
    } else {
      console.error("La geolocalizzazione non è supportata da questo browser.");
    }
  }, []);

  const handleSearch = (query) => {
    if (query.length > 2) {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
        })
        .catch((error) => {
          console.error("Errore nella ricerca della città:", error);
        });
    } else {
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    const { lat, lon } = suggestion;
    const newPosition = [parseFloat(lat), parseFloat(lon)];

    setPosition(newPosition);
    setSuggestions([]);

    // Centrare la mappa sulla città cercata
    if (mapRef.current) {
      mapRef.current.setView(newPosition, 13);
    }
  };

  const handleCurrentLocationClick = () => {
    if (userLocation) {
      setPosition(userLocation);

      if (mapRef.current) {
        mapRef.current.setView(userLocation, 13);
      }
    }
  };

  return (
    <div>
      <SearchBox 
        onSearch={handleSearch} 
        suggestions={suggestions} 
        onSelectSuggestion={handleSelectSuggestion} 
      />
      <button 
        onClick={handleCurrentLocationClick}
        style={{
          padding: '8px 12px',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#28a745',
          color: 'white',
          marginBottom: '10px',
          cursor: 'pointer'
        }}
      >
        Torna alla mia posizione
      </button>
      <MapContainer 
        center={position} 
        zoom={13} 
        style={{ height: '400px', width: '100%' }} 
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>
              Sei qui!
            </Popup>
          </Marker>
        )}
        <Marker position={position}>
          <Popup>
            Posizione selezionata.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
