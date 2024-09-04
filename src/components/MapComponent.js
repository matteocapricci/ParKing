import React, { useState, useEffect, useRef } from 'react';
import { TileLayer, MapContainer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useDispatch, useSelector } from "react-redux";
import { setLatitude, setLongitude } from '../store/App.js';

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

  const [position, setPosition] = useState([latitude, longitude]); // Posizione di default
  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(15)
  const mapRef = useRef();

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.setView([latitude, longitude], map.getZoom()); // Aggiorna la visualizzazione della mappa
    }
    setPosition([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <div>
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