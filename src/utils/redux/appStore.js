// src/app/store.js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import feedReducer from "./slices/feedSlice"; // Fix typo in feedReducer name
import connectionReducer from "./slices/connectionSlice";
import requestReducer from "./slices/requestSlice"; // Fix typo in requestReducer name
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist"; // Import persistReducer and persistStore correctly

// Configuration for redux-persist
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

// Root reducer with your slices
const rootReducer = combineReducers({
    user: userReducer,
    feed: feedReducer,
    connection: connectionReducer,
    request: requestReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
    reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
