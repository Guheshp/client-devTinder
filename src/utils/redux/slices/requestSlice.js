import { createSlice } from "@reduxjs/toolkit";

const requestSliceSlice = createSlice({
    name: "request",
    initialState: {
        request: []
    },
    reducers: {
        addRequest: (state, action) => {
            state.request = action.payload
        },
        removeRequest: (state, action) => {
            state.request = state.request.filter((r) => r._id !== action.payload)

        }
    }
})
export const { addRequest, removeRequest } = requestSliceSlice.actions
export default requestSliceSlice.reducer
