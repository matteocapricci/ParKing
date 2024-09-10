import { createSlice } from '@reduxjs/toolkit';

export const selectedParkingSlice = createSlice({
    name: 'selectedParking',
    initialState: {
        selectedParking: null
    },
    reducers: {
        setSelectedParking: (state, action) => {
            state.selectedParking = action.payload;
        },
        resetSelectedParking: (state, action) => {
            state.selectedParking = null;
        }
    },
});

export const selectedParkingForMapSlice = createSlice({
    name: 'selectedParkingForMap',
    initialState: {
        selectedParkingForMap: null
    },
    reducers: {
        setSelectedParkingForMap: (state, action) => {
            state.selectedParkingForMap = action.payload;
        },
        resetSelectedParkingForMap: (state, action) => {
            state.selectedParkingForMap = null;
        }
    },
});