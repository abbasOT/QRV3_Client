import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dateRange: '',
};

export const searchEventsByDate = createSlice({
    name: "searchEventsByDate",
    initialState,
    reducers: {
        setDateValues: (state, action) => {
            // Expect the payload to be a string with date range
            const { dateRange } = action.payload;
            state.dateRange = dateRange;
        },
    },
});

export const { setDateValues } = searchEventsByDate.actions;

export default searchEventsByDate.reducer;
