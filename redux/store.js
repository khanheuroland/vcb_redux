import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from "redux-persist";
import personReducer from './personSlice'
import authReducer from "./authSlice";

//Cau hinh redux-persist
const persistConfig = {
    key: 'root', //any content
    storage: AsyncStorage, //Su dung async storage de lu du lieu
    whitelist: ['person', 'auth'] //Danh sach cac reducer muon luu data vao storage
}

//Combine reducers 
const rootReducer = combineReducers({
    person: personReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Cau hinh store voi persistedReducer
export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store); //Taoj persistor