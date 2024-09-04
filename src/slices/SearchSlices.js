import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destination: '',
    dateIn: '',
    dateOut: '',
    transport: 'any',
    lat: '',
    lon:''
};

// Creazione dello slice per il form
export const updateDestinationFormSlice = createSlice({
    name: 'destinationForm',
    initialState,
    reducers: {
        setDestination: (state, action) => {
            state.destination = action.payload;
        },
        setDateIn: (state, action) => {
            state.dateIn = action.payload;
        },
        setDateOut: (state, action) => {
            state.dateOut = action.payload;
        },
        setTransport: (state, action) => {
            state.transport = action.payload;
        },
        setLatitude: (state, action) => {
            state.lat = action.payload;
        },
        setLongitude: (state, action) => {
            state.lon = action.payload;
        },
        resetForm: () => initialState,
    },
});