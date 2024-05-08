import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favourites: []
}

export const sliceFavourites = createSlice({
    name: "favourites",
    initialState,
    reducers: {
        addFavourites: (state, action) => {
            state.favourites.push(action.payload.newFav);
        },
        removeFavourites: (state, action) => {
            state.favourites = state.favourites.filter((fav) => fav.id !== action.payload.id);
        }
    }
})

export const { addFavourites, removeFavourites } = sliceFavourites.actions
export const favouritesReducer = sliceFavourites.reducer