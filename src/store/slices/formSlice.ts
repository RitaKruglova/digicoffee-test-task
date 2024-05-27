import { createSlice } from "@reduxjs/toolkit";
import { TFormSliceState } from "../../utils/types";

const initialState = {
  user: {
    email: '',
    role: 'user'
  },
} as TFormSliceState;

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {

  }
})

export default formSlice.reducer;