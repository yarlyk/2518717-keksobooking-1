export const BaseCoordinations = {
  LAT: 35.6854195988901,
  LNG: 139.7527348995209
};

export const MAX_PRICE = 100000;

export const MAP_SCALE = 13;

export const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Размещаю...'
};

export const URL = 'https://28.javascript.htmlacademy.pro/keksobooking';

export const DataUrl = {
  GET_DATA_URL: `${URL}/data`,
  SEND_DATA_URL: `${URL}`
};

export const Method = {
  GET: 'GET',
  POST: 'POST',
};

export const FILE_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'webp'];

export const FILTER_TYPES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

export const RERENDER_DELAY = 1000;

export const FLATS_COUNT = 10;

const PricePoints = {
  MIDDLE: 10000,
  HIGH: 50000
};

export const CheckPrice = {
  low: (value) => value < PricePoints.MIDDLE,
  middle: (value) => value >= PricePoints.MIDDLE && value < PricePoints.HIGH,
  high: (value) => value >= PricePoints.HIGH
};

export const POPUPS = {
  SUCCESS: 'success',
  ERROR: 'error'
};
