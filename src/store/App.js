import { configureStore } from '@reduxjs/toolkit';
import { updateDestinationFormSlice, searchedParkingsSlice, newSearchSlice} from '../slices/SearchSlices';
import { selectedParkingSlice } from '../slices/ParkingSlices';
import { infoReservationSlice } from '../slices/ReservationSlices';


// combination of all slices
const rootReducer = {
    setDestinationFormField: updateDestinationFormSlice.reducer,
    searchedParkings: searchedParkingsSlice.reducer,
    selectedParking: selectedParkingSlice.reducer,
    newSearch: newSearchSlice.reducer,
    setAttualCost: infoReservationSlice.reducer
};

const store = configureStore({
    reducer: rootReducer
});

export const { setDestination, setDateIn, setDateOut, setTransport, setLatitude, setLongitude, resetForm } = updateDestinationFormSlice.actions;
export const { setSearchedParkings } = searchedParkingsSlice.actions;
export const { setSelectedParking, resetSelectedParking } = selectedParkingSlice.actions;
export const { setNewSearch } = newSearchSlice.actions;
export const { setTotalCost, resetTotalCost } = infoReservationSlice.actions


export default store;