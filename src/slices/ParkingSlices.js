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