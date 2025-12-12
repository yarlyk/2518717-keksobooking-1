import { enableForm } from './control-form.js';
import { initMap } from './map.js';
import { showError } from './maker-massage-success-error.js';

const url = 'https://28.javascript.htmlacademy.pro/keksobooking';
const DataUrl = {
  GET_DATA_URL: `${url}/data`,
  SEND_DATA_URL: `${url}/`
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Перечисление текста ошибки
const TextErrorMessage = {
  GET_DATA_ER: 'Не удаётся получить данные. Обратитесь в поддержку',
  SEND_DATA_ER: 'Не удаётся отправить данные'
};

/**
 * Функция для получения данных с сервера
 * @returns - возвращает промис, который разрешается либо в массив данных, полученных от сервера, либо в пустой массив, если произошла ошибка.
 */
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

const getData = () => loader(DataUrl.GET_DATA_URL);

// Загружаем данные с сервера и инициализируем карту
const showApartments = getData()
  .then((apartments) => {
    if (apartments.length > 0) {
      initMap(apartments);
    }
  })
  .catch(() => {
      showError(TextErrorMessage.GET_DATA_ER);
  });

const sendAd = () => loader(DataUrl.SEND_DATA_URL, Method.POST, body);


export { showApartments, sendAd };
