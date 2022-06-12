import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ICarProps {
  model: string;
  autoMaker: string;
  amount: string;
  typeFuel: string;
  category: string;
  img: string;
  seats: string;
  gear: string;
}

const initialState = {
  cars: <ICarProps[]>[],
};

export const favoriteSlice = createSlice({
  name: "favoriteSlice",
  initialState,
  reducers: {
    setFavoriteCars: (state, action) => {
      state.cars = action.payload;
    },
    addFavoriteCar: (state, action) => {
      state.cars = [...state.cars, action.payload];
      console.log(state.cars, "state.cars");
    },
    removeFavoriteCar: (state, action) => {
      const carsFilter = state.cars.filter(
        (car) => car.model !== action.payload.model
      );
      state.cars = carsFilter;
    },
  },
});

export const { setFavoriteCars, addFavoriteCar, removeFavoriteCar } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;
