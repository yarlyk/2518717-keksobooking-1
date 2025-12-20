import { getDeclension } from './utils.js';

const roomTemplate = document.querySelector('#card').content.querySelector('.popup');

const qtyGuests = ['гостя', 'гостей'];
const qtyRooms = ['комната', 'комнаты', 'комнат'];
const TypeLocationNamed = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

export const createCustomPopup = (point) => {
  const roomElement = roomTemplate.cloneNode(true);
  const { offer: { title, price, type, checkin, checkout, address, rooms, guests, features = [], description, photos }, author: { avatar } } = point;

  roomElement.querySelector('.popup__title').textContent = title;
  roomElement.querySelector('.popup__text--address').textContent = address;
  roomElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  roomElement.querySelector('.popup__type').textContent = TypeLocationNamed[type];
  roomElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${getDeclension(qtyRooms, rooms)} для ${guests} ${getDeclension(qtyGuests, guests)}`;
  roomElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  roomElement.querySelector('.popup__description').textContent = description;

  // Заполняем удобства
  const featuresContainer = roomElement.querySelector('.popup__features');
  featuresContainer.innerHTML = ''; // Очищаем контейнер

  if (Array.isArray(features) && features.length > 0) {
    features.forEach((feature) => {
      const featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
      featuresContainer.appendChild(featureItem);
    });
  } else {
    // Если features отсутствует или пустой, можно добавить сообщение или оставить контейнер пустым
    const noFeaturesItem = document.createElement('li');
    noFeaturesItem.textContent = 'Нет доступных удобств';
    featuresContainer.appendChild(noFeaturesItem);
  }

  // Заполняем фотографии
  const photosContainer = roomElement.querySelector('.popup__photos');
  photosContainer.innerHTML = ''; // Очищаем контейнер
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

  // Устанавливаем аватар
  roomElement.querySelector('.popup__avatar').src = avatar;

  return roomElement;
};
