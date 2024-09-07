import React, { useState, useEffect, useRef } from 'react';
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import theme from '../style/palette.js';
import { useDispatch, useSelector } from "react-redux";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  const dispatch = useDispatch();

  const latitude = useSelector(state => state.setDestinationFormField.lat);
  const longitude = useSelector(state => state.setDestinationFormField.lon);
  const parkings = useSelector(state => state.searchedParkings.searchedParkings);
  const park = useSelector(state => state.selectedParking.selectedParking)

  let newSearch = useSelector(state => state.newSearch.search)

  const [position, setPosition] = useState([latitude, longitude]);
  const [zoom, setZoom] = useState(12)
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.setView([latitude, longitude], zoom); 
    }
    setPosition([latitude, longitude]);
    setZoom(12)
  }, [newSearch]);

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

  return (
    <div style={{border: `2px solid ${theme.palette.secondary.main}`}}>
      <MapContainer 
        center={position} 
        zoom={zoom}
        style={{ height: '700px', width: '100%' }} 
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {park === null ? (
          parkings.map((parking, index) => (
          <Marker
            key={index}
            position={[parking.location.latitude, parking.location.longitude]}
          >
            <Popup>
              <p style={{color: theme.palette.primary.main}}> 
                <b>{parking.name}</b> <br/>
                {parking.location.address} <br/>
                <div style={ratingStyle}>
                  {[...Array(Math.floor(parking.avg_rating))].map((_, i) => (
                      <FontAwesomeIcon icon={faCar} style={carValueStyle} key={i} />
                  ))}
                  {parking.avg_rating.toFixed(1)}
                </div>
              </p>
            </Popup>
          </Marker>
          ))
        ) :(
          <Marker
            position={[park.location.latitude, park.location.longitude]}
          >
            <Popup>
              <p style={{color: theme.palette.primary.main}}> 
                <b>{park.name}</b> <br/>
                {park.location.address} <br/>
                <div style={ratingStyle}>
                  {[...Array(Math.floor(park.avg_rating))].map((_, i) => (
                      <FontAwesomeIcon icon={faCar} style={carValueStyle} key={i} />
                  ))}
                  {park.avg_rating.toFixed(1)}
                </div>
              </p>
            </Popup>
          </Marker>
        )}
        
      </MapContainer>
    </div>
  );
}

export default MapComponent;