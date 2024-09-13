import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    destination: '',
    dateIn: '',
    dateOut: '',
    transport: 'any',
    lat: '',
    lon:''
};
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

export const searchedParkingsSlice = createSlice({
    name: 'searchedParkings',
    initialState: {
       searchedParkings: []
    },
    reducers: {
        setSearchedParkings: (state, action) => {
            state.searchedParkings = action.payload;
        }
    },
});

export const newSearchSlice = createSlice({
    name: 'newSearch',
    initialState:{
        search: 0
    },
    reducers:{
        setNewSearch: (state, action) => {
            state.search += 1 
        }
    }

})