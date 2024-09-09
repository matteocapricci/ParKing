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
  const dateIn = useSelector(state => state.setDestinationFormField.dateIn);
  const dateOut = useSelector(state => state.setDestinationFormField.dateOut);
  const transport = useSelector(state => state.setDestinationFormField.transport);

  const handleSortChange = async (event) => {
    const selectedOption = event.target.value;
    let retrivedParking = []; 
    try {
        retrivedParking = await load_parkingNearSerchedPosition(lat, lon, transport, dateIn, dateOut, selectedOption);
        setSortOption(selectedOption);
        dispatch(setSearchedParkings(retrivedParking));
    } catch (e) {
        console.log("ERRORE");
    }
  };

  // Responsive style
  const containerStyle = {
    padding: '10px 5%',
    fontSize: '18px',
    color: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
    '@media (min-width: 600px)': {
      flexDirection: 'row', // Row layout for larger screens
    },
  };

  const selectStyle = {
    padding: '8px 12px',
    borderRadius: '5px',
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    fontSize: '16px',
    cursor: 'pointer',
    width: '100%', // Full width on small screens
    maxWidth: '300px', // Limit width on larger screens
    '@media (min-width: 600px)': {
      width: 'auto', // Auto width for larger screens
    },
  };

  const labelStyle = {
    marginRight: '10px',
    fontSize: '16px',
    '@media (min-width: 600px)': {
      fontSize: '18px', // Larger font size for larger screens
    },
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>Sort by:</label>
      <select 
        value={sortOption} 
        onChange={handleSortChange}
        style={selectStyle}
      >
        <option value="default">-</option>
        <option value="rating">Best Rating</option>
        <option value="price">Lowest Price</option>
      </select>
    </div>
  );
};

export default SortDropdown;
