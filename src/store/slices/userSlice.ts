import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUserSliceState, TNameAndValue, TLoginArgs, TTokens, TUsersResponse, TUserInfo } from "../../utils/types";
import { api } from "../../utils/Api";

export const fetchLogin = createAsyncThunk(
  'user/fetchLogin',
  async ({ emailValue, passwordValue }: TLoginArgs): Promise<any> => {
    const response = await api.login(emailValue, passwordValue);
    return response;
  }
);

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (): Promise<any> => {
    const response = await api.getUsers();
    return response;
  }
);

export const fetchUserById = createAsyncThunk(
  'user/fetchUserById',
  async (id: number): Promise<any> => {
    const response = await api.getUserById(id);
    return response;
  }
)

const initialState = {
  values: {
    email: '',
    password: '',
  },
  userInfo: {
    id: -1,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: ''
  },
  users: {}
} as TUserSliceState;

const userSlice = createSlice({
  name: 'user',
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
        api.setAccessToken(action.payload.access);
        api.setRefreshToken(action.payload.refresh);
        localStorage.setItem('email', state.values.email);
        state.userInfo.email = state.values.email;

        if (state.values.email === 'rik@bk.ru') {
          state.userInfo.role = 'admin';
          localStorage.setItem('role', 'admin');
        } else {
          state.userInfo.role = 'user';
          localStorage.setItem('role', 'user');
        }

      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<TUsersResponse>) => {
        const foundUser = action.payload.results.find((user) => user.email === localStorage.getItem('email'));
        console.log(action.payload);
        if (foundUser) {
          state.userInfo = foundUser;
          localStorage.setItem('userId', String(foundUser.id));
        }
      })
      .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<TUserInfo>) => {
        state.userInfo = action.payload;
      })
  }
})

export default userSlice.reducer;
export const { setValue } = userSlice.actions;