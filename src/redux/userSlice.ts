import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  email: string;
  image: string;
  name: string;
  id: string;
}

const initialState = {
  user: <UserState>{},
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUSer: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = initialState.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUSer, removeUser } = userSlice.actions;

export default userSlice.reducer;
