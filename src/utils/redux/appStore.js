import { configureStore } from "@reduxjs/toolkit";
import userReduces from "./slices/userSlice"

const store = configureStore({
    reducer: {
        user: userReduces
    }
})

export default store