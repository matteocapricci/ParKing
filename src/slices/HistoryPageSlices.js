import { createSlice } from '@reduxjs/toolkit';

export const historyPageSlices = createSlice({
    name: 'historyPage',
    initialState: {
        currentPage: null
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        resetCurrentPage: (state, action) => {
            state.currentPage = null;
        }
    },
});