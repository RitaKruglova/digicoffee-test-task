export function checkResponse(res: Response): Promise<any> {
  if (res.ok) {
    return res.json();
  }

  return res.json().then(errorBody => {
    return Promise.reject({
      message: `Что-то пошло не так: ${res.status}`,
      status: res.status,
      statusText: res.statusText,
      url: res.url,
      body: errorBody
    });
  });
}