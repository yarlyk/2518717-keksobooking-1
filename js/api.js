import { DataUrl, Method } from './constants.js';
import { disableElement } from './control-form.js';

const formAd = document.querySelector('.ad-form');

const createRequest = (route, method = Method.GET, body = null) => fetch(route, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    disableElement(formAd, false);
    throw new Error();
  });

export const getData = () => createRequest(DataUrl.GET_DATA_URL);

export const sendAd = (body) => createRequest(DataUrl.SEND_DATA_URL, Method.POST, body);
