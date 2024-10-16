const roomsList = document.querySelector('#map-canvas');
const roomTamplate = document.querySelector('#card').content.querySelector('.popup');

/**
 * Заполняет описание карточки объявления
 * @param { object } realty - объект с данными карточки объявления
 */
const renderPopup = (realty) => {
  const roomElement = roomTamplate.cloneNode(true);

  roomElement.querySelector('.popup__title').textContent = realty.offer.title;
  roomElement.querySelector('.popup__text--address').textContent = `${realty.offer.address.lat}, ${realty.offer.address.lng}`;
  roomElement.querySelector('.popup__text--price').textContent = `${realty.offer.price} ₽/ночь`;
  roomElement.querySelector('.popup__type').textContent = realty.offer.type;
  const qtyRooms = realty.offer.rooms;
  roomElement.querySelector('.popup__text--capacity').textContent = `${qtyRooms} ${qtyRooms < 5 ? 'комнаты' : 'комнат'} для ${realty.offer.guests} гостей`;
  roomElement.querySelector('.popup__text--time').textContent = `Заезд после ${realty.offer.checkin}, выезд до ${realty.offer.checkout}`;

  const featureList = roomTamplate.querySelectorAll('.popup__feature');
  const FEATURES = realty.offer.features;
  roomElement.querySelector('.popup__features').innerHTML = '';
  featureList.forEach((featureListItem) => {
    const isNecessary = FEATURES.some(
      (feature) => featureListItem.classList.contains(`popup__feature--${feature}`),
    );
    if (!isNecessary) {
      roomElement.querySelector('.popup__features').appendChild(featureListItem);
    }
  });
  roomElement.querySelector('.popup__description').textContent = realty.offer.description;

  const PHOTO_ROOMS = realty.offer.photos;
  const photoTamplate = roomTamplate.querySelector('.popup__photo');

  roomElement.querySelector('.popup__photos').innerHTML = '';

  for (let i = 0; i < PHOTO_ROOMS.length; i++) {
    const photoElement = photoTamplate.cloneNode(true);
    photoElement.src = PHOTO_ROOMS[i];
    roomElement.querySelector('.popup__photos').append(photoElement);
  }

  roomElement.querySelector('.popup__avatar').src = realty.author.avatar;

  roomsList.appendChild(roomElement);
};

export { renderPopup };
