import { checkResponse } from "./check-response";
import { IApi, TMethod } from "./types";

class Api {
  private _url: string;
  private _headers: HeadersInit;

  constructor({ url, headers }: IApi) {
    this._url = url;
    this._headers = headers;
  }

  private _fetch(url: string = '', method: TMethod = 'GET', body?: any, headers: HeadersInit = {}): Promise<any> {
    return fetch(`${this._url}${url}`, {
      method,
      headers: {
        ...this._headers,
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })
      .then(checkResponse)
      .catch(err => {
        return Promise.reject(err);
      })
  }

  login(emailValue: string, passwordValue: string) {
    return this._fetch('/token', 'POST', {
      email: emailValue,
      password: passwordValue
    });
  }

  refreshToken(refreshToken: string) {
    return this._fetch('/token/refresh', 'POST', {
      refresh: refreshToken
    });
  }

  getUsers() {
    return this._fetch('/users');
  }

  getUserById(id: number) {
    return this._fetch(`/users/${id}`);
  }
 
  getPayments() {
    return this._fetch('/payments');
  }

  getPaymentById(paymentId: number) {
    return this._fetch(`/payments/${paymentId}`);
  }
}

const api = new Api({
  url: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }