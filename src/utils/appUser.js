import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import toastReducer from "./toastSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";

export const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        toast: toastReducer,
        connection: connectionReducer,
        request: requestReducer
    }
}) 