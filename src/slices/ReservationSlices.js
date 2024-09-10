import { createSlice } from '@reduxjs/toolkit';

export const infoReservationSlice = createSlice({
    name: 'selectedParking',
    initialState: {
        totalCost: null
    },
    reducers: {
        setTotalCost: (state, action) => {
            state.selectedParking = action.payload;
        },
        resetTotalCost: (state, action) => {
            state.selectedParking = null;
        }
    },
});