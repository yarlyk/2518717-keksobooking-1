import { getRandomInteger } from './utils.js';
import { getRandomArrayElement } from './utils.js';
import { getRandomArray } from './utils.js';
import { CreateUniqUser } from './utils.js';
import { TITLE_ROOMS } from './utils.js';
import { TYPE_LOCATION } from './utils.js';
import { TIME_CHECK } from './utils.js';
import { TYPE_FEATURES } from './utils.js';
import { DESCRIPTION_ROOMS } from './utils.js';
import { PHOTO_ROOMS } from './utils.js';

const generateRoom = () => ({
  author: {
    avatar: `img/avatars/user${CreateUniqUser()}.png`,
  },
  offer: {
    title: getRandomArrayElement(TITLE_ROOMS),
    address: {
      lat: getRandomInteger(35.65, 35.7, 5),
      lng: getRandomInteger(139.7, 139.8, 5),
    },
    price: getRandomInteger(1000, 10000),
    type: getRandomArrayElement(TYPE_LOCATION),
    rooms: getRandomInteger(1, 5),
    guests: getRandomInteger(1, 10),
    checkin: getRandomArrayElement(TIME_CHECK),
    checkout: getRandomArrayElement(TIME_CHECK),
    features: getRandomArray(TYPE_FEATURES),
    description: getRandomArrayElement(DESCRIPTION_ROOMS),
    photos: getRandomArray(PHOTO_ROOMS),
    location: {
      lat: getRandomInteger(35.65, 35.7, 5),
      lng: getRandomInteger(139.7, 139.8, 5),
    },
  },
});

const getArrayRooms = (lengthArray) => {
  let arrayRooms = [];
  for (let i = 0; i < lengthArray; i++) {
    array.push(generateRoom());
  }
  return arrayRooms;
};

export{getArrayRooms};
