import { configureStore } from '@reduxjs/toolkit';
import { updateDestinationFormSlice } from '../slices/SearchSlices'; 


// combination of all slices
const rootReducer = {
    setDestinationFormField: updateDestinationFormSlice.reducer
};

const store = configureStore({
    reducer: rootReducer,
});

export const { setDestination, setDateIn, setDateOut, setTransport, setLatitude, setLongitude, resetForm } = updateDestinationFormSlice.actions

export default store;