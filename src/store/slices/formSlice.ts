import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TFormSliceState, TNameAndValue, TLoginArgs, TTokens } from "../../utils/types";
import { api } from "../../utils/Api";

export const fetchLogin = createAsyncThunk(
  'form/fetchLogin',
  async ({ emailValue, passwordValue }: TLoginArgs): Promise<any> => {
    const response = await api.login(emailValue, passwordValue);
    return response;
  }
);

const initialState = {
  user: {
    email: '',
    role: 'user',
  },
  values: {
    email: '',
    password: '',
  },
} as TFormSliceState;

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<TNameAndValue>) => {
      state.values[action.payload.name] = action.payload.value;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.fulfilled, (state, action: PayloadAction<TTokens>) => {
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
        localStorage.setItem('role', state.user.role);

        state.user.email = state.values.email;
        if (state.values.email === 'rik@bk.ru') {
          state.user.role = 'admin';
        } else {
          state.user.role = 'user';
        }
      })
  }
})

export default formSlice.reducer;
export const { setValue } = formSlice.actions;