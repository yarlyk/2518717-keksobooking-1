import { enableForm, enableFilter } from './control-form.js';

const roomTamplate = document.querySelector('#card').content.querySelector('.popup');
const qtyGuests = ['гостя', 'гостей'];
const qtyRooms = ['комната', 'комнаты', 'комнат'];
const TypeLocationNamed = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

/**
 * Выбирает из мвссива слово нужного склонения
 * @param { Array } arr - массив со словами разного склонения
 * @param { number } element - случайное число из диапазона
 * @returns { string } возвращает слово нужного склонения
 */
const getDeclension = (arr, element) => {
  const lastDigit = element % 10;
  if (arr.length < 3) {
    if (element > 1) {
      return arr[1];
    }
    return arr[0];
  }
  if (lastDigit === 1 && element !== 11) {
    return arr[0];
  }
  if (lastDigit > 1 && lastDigit < 5 && element !== 12 && element !== 13 && element !== 14) {
    return arr[1];
  }
  return arr[2];
};

/**
 * Создаёт карту с метками
 * @param { Array } apartments - массив с объектами для заселения
 */
const initMap = (apartments) => {
  // Находим элемент формы Адрес для управления его значением
  const addressMarker = document.querySelector('#address');

  //Определяем место инициализации карты и отслеживаем саму инициализацию
  const map = L.map('map-canvas')
    .on('load', () => {
      enableForm(); // Форма активируется после загрузки карты
      enableFilter(); // Фильтр активируется после загрузки карты
    })
    .setView({
      lat: 35.6854195988901,
      lng: 139.7527348995209
    }, 12);

  // Указываем какая карта будет использована
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  // Указываем параметры главной метки
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  //Создание главной метки и добавляем её на карту
  const marker = L.marker(
    {
      lat: 35.6854195988901,
      lng: 139.7527348995209
    },
    {
      draggable: true,
      icon: mainPinIcon
    },
  ).addTo(map);

  // Отслеживаем перемещение главной метки с передачей геоданных, когда метка прекратила движение в поле Адрес
  marker.on('moveend', (evt) => {
    const geoMarker = evt.target.getLatLng();
    addressMarker.value = `${geoMarker.lat}, ${geoMarker.lng}`;
  });

  // Указываем параметры обычной метки
  const ordinaryIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  /**
 * Заполняет описание карточки объявления и вставляет его в DOM
 * @param { Object } point - объект с данными карточки объявления
 */
  const createCustomPopup = (point) => {
    const roomElement = roomTamplate.cloneNode(true);
    const { offer: { title, price, type, checkin, checkout, address, rooms, guests, features = [], description, photos }, author: { avatar } } = point;

    // Заполняем текстовые поля
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

  // Создание обычных меток на карте из массива объектов
  apartments.forEach((apartment) => {
    const { location: { lat, lng } } = apartment;
    const markerRandom = L.marker({
      lat,
      lng,
    },
    {
      icon: ordinaryIcon
    }
    );
    markerRandom
      .addTo(map)
      .bindPopup(createCustomPopup(apartment));
  });
};

export { initMap };
