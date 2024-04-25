import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourites: []
}

export const sliceFavourites = createSlice({
    name: "favourites",
    initialState,
    reducers:{
        addFavourites: (state, action) => {
            state.favourites = state.favourites.filter(item => item !== action.payload);
        },
        removeFavourites: (state, action) => {
            state.favourites = state.favourites.push(action.payload);
        }
    }
})

export const { addFavourites, removeFavourites } = sliceFavourites.actions
export const favouritesReducer = sliceFavourites.reducer