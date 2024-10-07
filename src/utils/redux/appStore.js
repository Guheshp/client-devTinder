import { configureStore } from "@reduxjs/toolkit";
import userReduces from "./slices/userSlice"
import feedReduces from "./slices/feedSlice"
import connectionReducer from "./slices/connectionSlice"
import requestReduces from "./slices/requestSlice"

const store = configureStore({
    reducer: {
        user: userReduces,
        feed: feedReduces,
        connection: connectionReducer,
        request: requestReduces,
    }
})

export default store