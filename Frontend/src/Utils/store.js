import { configureStore } from "@reduxjs/toolkit";
import addFlightSlice from './addFlightSlice';

const store = configureStore({
    reducer: {
        addFlight: addFlightSlice
    }
});
export default store;