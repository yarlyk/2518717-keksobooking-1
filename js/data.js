import { getRandomInteger, getRandomArrayElement, getRandomArray, createUniqUser } from './utils.js';

const TYPE_LOCATION = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_CHECK = ['12:00', '13:00', '14:00'];
const TYPE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION_ROOMS = [
  'Уютный номер с прекрасным видом',
  'Просторный, светлый номер',
  'Комфорт для гостей - наш приоритет',
  'Прекрасный номер для полноценного отдыха',
  'Побывав здесь, Вы обязательно вернётесь!',
];

const PHOTO_ROOMS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TITLE_ROOMS = [
  'Лучший номер10',
  'Лучшее сочетание "Цена-качество"',
  'Наш дивиз - "Чистота и забота!"',
  'Ваш отдых - наше призвание!',
  'Три номера по цене двух!',
  'У нас скучно не будет!',
];

const PRICE_MIN = 1000;

const PRICE_MAX = 10000;

const ROOMS_MIN = 1;

const ROOMS_MAX = 5;

const GUESTS_MIN = 1;

const MAX_GUESTS = 10;

const LOCATION_LAT_MIN = 35.65;

const LOCATION_LAT_MAX = 35.7;

const LOCATION_LNG_MIN = 139.7;

const LOCATION_LNG_MAX = 139.8;

const LOCATION_ACCURACY = 5;

const locationLat = getRandomInteger(LOCATION_LAT_MIN, LOCATION_LAT_MAX, LOCATION_ACCURACY);

const locationLng = getRandomInteger(LOCATION_LNG_MIN, LOCATION_LNG_MAX, LOCATION_ACCURACY);

const generateRoom = () => ({
  author: {
    avatar: `img/avatars/user${createUniqUser()}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLE_ROOMS),
    address: {
      lat: locationLat,
      lng: locationLng,
    },
    price: getRandomInteger(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(TYPE_LOCATION),
    rooms: getRandomInteger(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomInteger(GUESTS_MIN, MAX_GUESTS),
    checkin: getRandomArrayElement(TIME_CHECK),
    checkout: getRandomArrayElement(TIME_CHECK),
    features: getRandomArray(TYPE_FEATURES),
    description: getRandomArrayElement(DESCRIPTION_ROOMS),
    photos: getRandomArray(PHOTO_ROOMS),
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  },
});

const generateRooms = (lengthArray) => {
  const rooms = [];
  for (let i = 0; i < lengthArray; i++) {
    rooms.push(generateRoom());
  }
  return rooms;
};

export{ generateRooms };
