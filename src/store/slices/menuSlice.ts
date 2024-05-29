import { createSlice } from "@reduxjs/toolkit";
import { TMenuSliceState } from "../../utils/types";

const initialState = {
  isMenuOpen: false,
} as TMenuSliceState;

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setIsMenuOpen: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    }
  }
});

export default menuSlice.reducer;
export const { setIsMenuOpen } = menuSlice.actions;