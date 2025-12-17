import { enableForm } from './control-form.js';
import { initMap } from './map.js';
import { showMessage } from './maker-massage-success-error.js';
// import { validatingFormSubmit } from './validate-form.js';

const submitButton = document.querySelector('.ad-form__submit'); // Находим кнопку "Опубликовать"

// Перечисление текста кнопки "Опубликовать"
const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Размещаю...'
};

const url = 'https://28.javascript.htmlacademy.pro/keksobooking';
const DataUrl = {
  GET_DATA_URL: `${url}/data`,
  SEND_DATA_URL: `${url}`
};
// Перечисление методов
const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Перечисление текста ошибки
const TextMessage = {
  GET_DATA_ER: 'Не удаётся получить данные. Обратитесь в поддержку',
  SEND_DATA_ER: 'Не удаётся отправить данные',
  SUCCESSFUL_SENDING: 'Успешная отправка'
};

// const blockSubmitButton = () => {
//   submitButton.disabled = true;
//   submitButton.textContent = SubmitButtonText.SENDING;
// };

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
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
const showApartments = () => {
  getData()
    .then((apartments) => {
      if (apartments.length > 0) {
        initMap(apartments);
      }
    })
    .catch(() => {
      showMessage(TextMessage.GET_DATA_ER);
    });
};

const sendAd = (body) => loader(DataUrl.SEND_DATA_URL, Method.POST, body);

// const adForm = document.querySelector('.ad-form');

// const sendAdSubmit = () => {
//   adForm.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     validatingFormSubmit();
//     blockSubmitButton();
//     sendAd(new FormData(adForm))
//       .then(unblockSubmitButton,
//         showMessage(TextMessage.SUCCESSFUL_SENDING)
//       )
//       .catch(() => {
//         showMessage(TextMessage.SEND_DATA_ER);
//       });
//   }
//   );
// };


export { unblockSubmitButton, sendAd, showApartments };
