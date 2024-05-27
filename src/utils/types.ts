export type TUser = {
  email: string,
  role: 'admin' | 'user',
}

export type TFormSliceState = {
  user: TUser,
}

export interface IApi {
  url: string;
  headers: HeadersInit;
}

export type TMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';