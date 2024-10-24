import { configureStore } from "@reduxjs/toolkit";
import personReducer from './personSlice'
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        person: personReducer,
        auth: authReducer
    }
});
