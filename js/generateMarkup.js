import { generateRooms } from './data.js';

const roomsList = document.querySelector('#map-canvas');
const roomTamplate = document.querySelector('#card').content.querySelector('.popup');
const anotherRoom = generateRooms(1);

const roomElement = roomTamplate.cloneNode(true);

roomElement.querySelector('.popup__title').textContent = anotherRoom[0].offer.title;
roomElement.querySelector('.popup__text--address').textContent = `${anotherRoom[0].offer.address.lat}, ${anotherRoom[0].offer.address.lng}`;
roomElement.querySelector('.popup__text--price').textContent = `${anotherRoom[0].offer.price} ₽/ночь`;
roomElement.querySelector('.popup__type').textContent = anotherRoom[0].offer.type;
const qtyRooms = anotherRoom[0].offer.rooms;
roomElement.querySelector('.popup__text--capacity').textContent = `${qtyRooms} ${qtyRooms < 5 ? 'комнаты' : 'комнат'} для ${anotherRoom[0].offer.guests} гостей`;
roomElement.querySelector('.popup__text--time').textContent = `Заезд после ${anotherRoom[0].offer.checkin}, выезд до ${anotherRoom[0].offer.checkout}`;

const featureList = roomTamplate.querySelectorAll('.popup__feature');
const FEATURES = anotherRoom[0].offer.features;
roomElement.querySelector('.popup__features').innerHTML = '';
featureList.forEach((featureListItem) => {
  const isNecessary = FEATURES.some(
    (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
  );
  if (!isNecessary) {
    roomElement.querySelector('.popup__features').appendChild(featureListItem);
  }
});

roomElement.querySelector('.popup__description').textContent = anotherRoom[0].offer.description;

roomsList.appendChild(roomElement);
