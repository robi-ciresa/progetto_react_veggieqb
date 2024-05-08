import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: ""
}

export const sliceQuery = createSlice({
    name: "query",
    initialState,
    reducers: {
        newQuery: (state, action) => {
            state.query = action.payload
        }
    }
})

export const { newQuery } = sliceQuery.actions
export const queryReducer = sliceQuery.reducer