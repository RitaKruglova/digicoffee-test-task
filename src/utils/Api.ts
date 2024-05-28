import { checkResponse } from "./check-response";
import { IApi, TMethod } from "./types";

class Api {
  private _url: string;
  private _headers: HeadersInit;
  private _accessToken: string | null;
  private _refreshToken: string | null;

  constructor({ url, headers }: IApi) {
    this._url = url;
    this._headers = headers;
    this._accessToken = localStorage.getItem('accessToken');
    this._refreshToken = localStorage.getItem('refreshToken');
  }

  private _fetch(url: string = '', method: TMethod = 'GET', body?: any, headers: HeadersInit = {}, isRetry = false): Promise<any> {
    return fetch(`${this._url}${url}`, {
      method,
      headers: {
        'Authorization': `Token ${this._accessToken}`,
        ...this._headers,
        ...headers
      },
      body: body ? JSON.stringify(body) : null
    })
      .then(checkResponse)
      .catch(err => {
        if (err.status === 401 && !isRetry) {
          this.refreshToken()
            .then(data => {
              this.setAccessToken(data.access);
              this._fetch(url, method, body, headers, true)
            })
            .catch(err => {
              return Promise.reject(err);
            })
        }
        return Promise.reject(err);
      })
  }

  setAccessToken(token: string | null) {
    this._accessToken = token;
  }

  setRefreshToken(token: string | null) {
    this._refreshToken = token;
  }

  login(emailValue: string, passwordValue: string) {
    return this._fetch('/token/', 'POST', {
      email: emailValue,
      password: passwordValue
    });
  }

  refreshToken() {
    return this._fetch('/token/refresh/', 'POST', {
      refresh: this._refreshToken
    });
  }

  getUsers() {
    return this._fetch('/users/');
  }

  getUserById(id: number) {
    return this._fetch(`/users/${id}/`);
  }
 
  getPayments() {
    return this._fetch('/payments/');
  }

  getPaymentById(paymentId: number) {
    return this._fetch(`/payments/${paymentId}/`);
  }
}

const api = new Api({
  url: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export { api }