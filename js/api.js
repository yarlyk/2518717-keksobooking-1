import { DataUrl, Method } from './constants.js';

const loader = (route, method = Method.GET, body = null) => fetch(route, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    enableForm();
    throw new Error();
  });

export const getData = () => loader(DataUrl.GET_DATA_URL);

export const sendAd = (body) => loader(DataUrl.SEND_DATA_URL, Method.POST, body);