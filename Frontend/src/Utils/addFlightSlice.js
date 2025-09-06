import { createSlice } from "@reduxjs/toolkit";

const addFlightSlice = createSlice({
    name: "addFlight",
    initialState: {
        flight: []
    },
    reducers: {
        addNewFlight: (state, action) => {
            state.flight.push(action.payload);
        }
    }
})

export default addFlightSlice.reducer;
export const { addNewFlight } = addFlightSlice.actions;