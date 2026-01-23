import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import toastReducer from "./toastSlice";

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        toast: toastReducer
    }
}) 