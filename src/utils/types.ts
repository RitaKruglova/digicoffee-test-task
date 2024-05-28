import store from '../store';

export type TUser = {
  email: string,
  role: 'admin' | 'user',
}

export type TUserValues = {
  email: string;
  password: string;
}

export type TNameAndValue = {
  name: 'email' | 'password';
  value: string;
}

export type TFormSliceState = {
  user: TUser;
  values: TUserValues;
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

export type TMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;