import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: [],
    reducers: {
        addRequest: (state, action) => action.payload,
        removeRequest: (state, action) => {
            const tempRequests = state.filter((request) => request._id !== action.payload);
            return tempRequests;
        }
    }
})

export const { addRequest, removeRequest } = requestSlice.actions;

export default requestSlice.reducer