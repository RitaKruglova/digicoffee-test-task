import store from '../store';

export type TUserValues = {
  email: string;
  password: string;
}

export type TNameAndValue = {
  name: 'email' | 'password';
  value: string;
}

export type TUserSliceState = {
  values: TUserValues;
  userInfo: TUserInfo;
}

export interface IApi {
  url: string;
  headers: HeadersInit;
}

export type TLoginArgs = {
  emailValue: string;
  passwordValue: string;
}

export type TTokens = {
  access: string;
  refresh: string;
}

export type TUserInfo = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}

export type TUsersResponse = {
  count: number;
  next: string;
  previous: string;
  results: TUserInfo[];
}

export type TMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;