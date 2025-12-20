import { DataUrl, Method } from './constants.js';
import { disableForm } from './control-form.js';

const loader = (route, method = Method.GET, body = null) => fetch(route, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error(); //Здесь надо поставить вызов сообщения "Не удалось подключиться"
    }
    return response.json();
  })
  .catch(() => {
    disableForm(false);
    throw new Error();
  });

export const getData = () => loader(DataUrl.GET_DATA_URL);

export const sendAd = (body) => loader(DataUrl.SEND_DATA_URL, Method.POST, body);
