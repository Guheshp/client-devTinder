import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
    name: "connection",
    initialState: {
        connectection: null
    },
    reducers: {
        addConnection: (state, action) => {
            state.connectection = action.payload
        },
        removeConnection: (state, action) => {
            state.connectection = null
        }
    }
})

export const { addConnection, removeConnection } = connectionSlice.actions
export default connectionSlice.reducer