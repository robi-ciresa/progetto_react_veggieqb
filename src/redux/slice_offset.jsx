import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
}

export const sliceOffset = createSlice({
    name: "offset",
    initialState,
    reducers: {
        plusOffset: (state) => {
            state.value += 12
        },
        minusOffset: (state) => {
            state.value -= 12
        },
        resetOffset: (state) => {
            state.value = 0
        }
    }
})

export const { plusOffset, minusOffset, resetOffset } = sliceOffset.actions
export const offsetReducer = sliceOffset.reducer