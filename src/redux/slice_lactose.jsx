import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lactoseFree: false
}

export const sliceLactose = createSlice({
    name: "lactoseFree",
    initialState,
    reducers: {
        checkLactoseTrue: (state) => {
            state.lactoseFree = true
        },
        checkLactoseFalse: (state) => {
            state.lactoseFree = false
        }
    }
})

export const { checkLactoseTrue, checkLactoseFalse } = sliceLactose.actions
export const lactoseReducer = sliceLactose.reducer