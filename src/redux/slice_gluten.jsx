import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    glutenFree: false
}

export const sliceGluten = createSlice({
    name: "glutenFree",
    initialState,
    reducers: {
        checkGlutenTrue: (state) => {
            state.glutenFree = true
        },
        checkGlutenFalse: (state) => {
            state.glutenFree = false
        }
    }
})

export const { checkGlutenTrue, checkGlutenFalse } = sliceGluten.actions
export const glutenReducer = sliceGluten.reducer