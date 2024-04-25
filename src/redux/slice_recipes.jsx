import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    recipes: []
}

export const sliceRecipes = createSlice({
    name: "recipes",
    initialState,
    reducers:{
        newRecipes: (state, action) => {
            state.recipes = action.payload;
        }
    }
})

export const { newRecipes } = sliceRecipes.actions
export const recipesReducer = sliceRecipes.reducer