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
  users: TUsersResponse;
  isAuthorized: boolean;
}

export type TMenuSliceState = {
  isMenuOpen: boolean;
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

export type TPageClickEvent = {
  selected: number;
}

export type TPayment = {
  id: number;
  user: TUserInfo;
  product: string;
  price: number;
  currency: string;
  pay_date: string;
}

export type TPayments = {
  count: number;
  next: string;
  previous: string;
  results: TPayment[];
}

export type TPaymentsSliceState = {
  startDate: Date | null;
  endDate: Date | null;
  exactDate: Date | null;
  filterType: 'exact' | 'range';
  payments: TPayments
}

export type TPaymentsArgs = {
  startDate: Date | null;
  endDate: Date | null;
  exactDate: Date | null;
}

export interface IHourValues {
  [key: number]: number;
}

export type TMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;