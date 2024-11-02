const roomsList = document.querySelector('#map-canvas');
const roomTamplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Заполняет описание карточки объявления
 * @param { object } realty - объект с данными карточки объявления
 */
const renderPopup = (realty) => {
  const roomElement = roomTamplate.cloneNode(true);
  const { offer: { title, price, type, checkin, checkout, address: { lat, lng }, rooms, guests, features, description, photos }, author: { avatar } } = realty;

  roomElement.querySelector('.popup__title').textContent = title;
  roomElement.querySelector('.popup__text--address').textContent = `${lat}, ${lng}`;
  roomElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  roomElement.querySelector('.popup__type').textContent = type;
  roomElement.querySelector('.popup__text--capacity').textContent = `${rooms} ${rooms < 5 ? 'комнаты' : 'комнат'} для ${guests} гостей`;
  roomElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  const featureList = roomTamplate.querySelectorAll('.popup__feature');
  const FEATURES = features;
  roomElement.querySelector('.popup__features').innerHTML = '';
  featureList.forEach((featureListItem) => {
    const isNecessary = FEATURES.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      roomElement.querySelector('.popup__features').appendChild(featureListItem);
    }
  });
  roomElement.querySelector('.popup__description').textContent = description;

  const PHOTO_ROOMS = photos;
  const photoTamplate = roomTamplate.querySelector('.popup__photo');

  roomElement.querySelector('.popup__photos').innerHTML = '';

  for (let i = 0; i < PHOTO_ROOMS.length; i++) {
    const photoElement = photoTamplate.cloneNode(true);
    photoElement.src = PHOTO_ROOMS[i];
    roomElement.querySelector('.popup__photos').append(photoElement);
  }

  roomElement.querySelector('.popup__avatar').src = avatar;

  roomsList.append(roomElement);
};

export { renderPopup };
