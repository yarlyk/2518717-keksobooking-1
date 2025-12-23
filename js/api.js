import { DataUrl, Method } from './constants.js';
import { disableForm } from './control-form.js';

/**
 * Функция для отправки получения данных
 * @param {String} route - адрес сервера
 * @param {String} method - метод отправки/получения данных
 * @param {*} body - набор данных для отправки на сервер
 * @returns
 */

const loader = (route, method = Method.GET, body = null) => fetch(route, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    disableForm(false);
    throw new Error();
  });

export const getData = () => loader(DataUrl.GET_DATA_URL);

export const sendAd = (body) => loader(DataUrl.SEND_DATA_URL, Method.POST, body);
