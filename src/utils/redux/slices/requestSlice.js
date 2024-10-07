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
        removeRequeat: (state, action) => {
            state.request = null
        }
    }
})
export const { addRequest, removeRequeat } = requestSliceSlice.actions
export default requestSliceSlice.reducer