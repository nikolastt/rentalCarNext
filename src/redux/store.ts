import { configureStore } from "@reduxjs/toolkit";

import filterByCategory from "./filterByCategorySlice";
import carsSlice from "./carsSlice";
import favoritesSlice from "./favoriteslice";

export const store = configureStore({
  reducer: {
    filterByCategory,
    carsSlice,
    favoritesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
