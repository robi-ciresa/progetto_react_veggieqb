import { configureStore } from "@reduxjs/toolkit";
import { lactoseReducer } from "./slice_lactose";
import { glutenReducer } from "./slice_gluten";
import { queryReducer } from "./slice_query";
import { offsetReducer } from "./slice_offset";
import { favouritesReducer } from "./slice_favourites";

export const store = configureStore({
    reducer: {
        glutenFree: glutenReducer,
        lactoseFree: lactoseReducer,
        query: queryReducer,
        offset: offsetReducer,
        favourites: favouritesReducer,

    }
})