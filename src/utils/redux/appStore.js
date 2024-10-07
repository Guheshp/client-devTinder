import { configureStore } from "@reduxjs/toolkit";
import userReduces from "./slices/userSlice"
import feedReduces from "./slices/feedSlice"

const store = configureStore({
    reducer: {
        user: userReduces,
        feed: feedReduces
    }
})

export default store