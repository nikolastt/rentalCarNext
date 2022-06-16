import { configureStore } from "@reduxjs/toolkit";

import filterByCategory from "./filterByCategorySlice";
import carsSlice from "./carsSlice";
import favoritesSlice from "./favoriteslice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    filterByCategory,
    carsSlice,
    favoritesSlice,
    userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
