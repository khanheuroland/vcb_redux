import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counterSlice';
import advancedCounterReducer from './advancedSlide';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        advancedCounter: advancedCounterReducer
    }
});
