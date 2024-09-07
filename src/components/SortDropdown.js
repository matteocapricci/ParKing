import React, { useState } from 'react';
import theme from '../style/palette.js';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedParkings } from '../store/App.js';
import { load_parkingNearSerchedPosition } from '../services/firebase/persistenceManager.js';

const SortDropdown = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState('default');

  const dispatch = useDispatch();

  let lat = useSelector(state => state.setDestinationFormField.lat);
  let lon = useSelector(state => state.setDestinationFormField.lon);

  const handleSortChange = async (event) => {
    const selectedOption = event.target.value;
    let retrivedParking = []; 
    try {
        console.log(lat);
        console.log(lon);
        console.log(selectedOption);
        retrivedParking = await load_parkingNearSerchedPosition(lat, lon, selectedOption);
        console.log(retrivedParking);
        setSortOption(selectedOption)
        dispatch(setSearchedParkings(retrivedParking))
    } catch (e) {
        console.log("ERRORE")
    }
  };

  return (
    <div style={{ padding: '10px 20px', fontSize: '18px', color: theme.palette.primary.main }}>
      <label style={{ marginRight: '10px' }}>Sort by:</label>
      <select 
        value={sortOption} 
        onChange={handleSortChange}
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: `2px solid ${theme.palette.primary.main}`,
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        <option value="default">-</option>
        <option value="rating">Rating</option>
        <option value="price">Lowest Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
