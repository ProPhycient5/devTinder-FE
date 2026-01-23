import { createSlice } from "@reduxjs/toolkit";


const toastSlice = createSlice({
    name: "toast",
    initialState: false,
    reducers: {
        handleShowToast: (state, action) => {
            return action.payload;
        },
    }
})

export const { handleShowToast } = toastSlice.actions;

export default toastSlice.reducer;