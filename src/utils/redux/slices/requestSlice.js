import { createSlice } from "@reduxjs/toolkit";

const requestSliceSlice = createSlice({
    name: "request",
    initialState: {
        request: null
    },
    reducers: {
        addRequest: (state, action) => {
            state.request = action.payload
        },
        removeRequest: (state, action) => {
            state.request = state.filter((r) => r._id !== action.payload)

        }
    }
})
export const { addRequest, removeRequest } = requestSliceSlice.actions
export default requestSliceSlice.reducer