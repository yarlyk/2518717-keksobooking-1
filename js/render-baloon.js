import { getDeclension } from './utils.js';

const roomTemplate = document.querySelector('#card').content.querySelector('.popup');

const qtyGuests = ['гостя', 'гостей'];
const qtyRooms = ['комната', 'комнаты', 'комнат'];
const TypeLocationNamed = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

export const createCustomPopup = (point) => {
  const roomElement = roomTemplate.cloneNode(true);
  const { offer: { title, price, type, checkin, checkout, address, rooms, guests, features = [], description, photos }, author: { avatar } } = point;

  roomElement.querySelector('.popup__title').textContent = title;
  roomElement.querySelector('.popup__text--address').textContent = address;
  roomElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  roomElement.querySelector('.popup__type').textContent = TypeLocationNamed[type.toUpperCase()];
  roomElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclension(qtyRooms, rooms)} для ${guests} ${getDeclension(qtyGuests, guests)}`;
  roomElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  if (!description || !description.length) {
    roomElement.querySelector('.popup__description').remove();
  } else {
    roomElement.querySelector('.popup__description').textContent = description;
  }


  const featuresContainer = roomElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';

  if (features.length > 0) {
    features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresContainer.appendChild(featureItem);
    });
  } else {

    const noFeaturesItem = document.createElement('li');
    noFeaturesItem.textContent = 'Нет доступных удобств';
    featuresContainer.appendChild(noFeaturesItem);
  }

  const photosContainer = roomElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (Array.isArray(photos) && photos.length > 0) {
    photos.forEach((photo) => {
      const photoElement = document.createElement('img');
      photoElement.src = photo;
      photoElement.classList.add('popup__photo');
      photoElement.width = 45;
      photoElement.height = 40;
      photoElement.alt = 'Фотография жилья';
      photosContainer.appendChild(photoElement);
    });
  }

  roomElement.querySelector('.popup__avatar').src = avatar;

  return roomElement;
};
