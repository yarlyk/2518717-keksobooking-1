// Начальные координаты карты и главной метки
export const BaseCoordinations = {
  LAT: 35.6854195988901,
  LNG: 139.7527348995209
};
// Масштаб карты при инициализации
export const MAP_SCALE = 13;
// Перечисление текстов кнопки при отправке данных
export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Размещаю...'
};
// Адрес сервера
export const URL = 'https://28.javascript.htmlacademy.pro/keksobooking';
// Перечисление адресов получения и отправки данных
export const DataUrl = {
  GET_DATA_URL: `${URL}/data`,
  SEND_DATA_URL: `${URL}`
};
// Перечисление методов получения и отправки данных
export const Method = {
  GET: 'GET',
  POST: 'POST',
};

// Типы файлов для загрузки изображений
export const FILE_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];
// Массив с типами удобств для фильтрации
export const FILTER_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// Время задержки анти дребезга
export const RERENDER_DELAY = 1000;
