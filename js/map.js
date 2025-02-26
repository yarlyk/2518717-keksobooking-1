import { enableForm, enableFilter } from './control-form.js';
import { qtyGuests, qtyRooms, getDeclension } from './generate-markup.js';

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

  //Создание главной метки
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
   * Перебираем массив со случайными удобствами и создаёт строку с набором тегов по шаблону с добавлением этих удобств
   * @param { Array } features - массив со случайным набором удобств
   * @returns строку с тегами для передачи в createCustomPopup
   */
  const renderFeatures = (features) => {
    let featuresString = '';
    features.forEach((feature) => {
      featuresString += `<li class="popup__feature popup__feature--${feature}"></li>`;
    });
    return featuresString;
  };

  /**
   * Перебираем массив со случайными ссылками на фотографии и создаёт строку с набором тегов по шаблону с добавлением этих ссылок
   * @param { Array} photos - массив со случайным набором ссылок на фотографии
   * @returns строку с тегами для передачи в createCustomPopup
   */
  const renderPhotos = (photos) => {
    let photosString = '';
    photos.forEach((photo) => {
      photosString += `<div class="popup__photos" style = 'display: inline-block'><img src=${photo} class="popup__photo" width="45" height="40" alt="Фотография жилья"></div>`;
    });
    return photosString;
  };

  // Создание шаблона для генерации балуна обычных метов
  const createCustomPopup = ({ offer: { title, price, type, checkin, checkout, address: { lat, lng }, rooms, guests, features, description, photos }, author: { avatar } }) => `<section class="popup">
  <h3 class="popup__title">${title}</h3>
  <p class="popup__text popup__text--address">Координаты: ${lat}, ${lng}</p>
  <p class="popup__text popup__text--price">${price}<span>₽/ночь</span></p>
  <h4 class="popup__type">${type}</h4>
  <p class="popup__text popup__text--capacity">${rooms} ${getDeclension(qtyRooms, rooms)} для ${guests} ${getDeclension(qtyGuests, guests)}</p>
  <p class="popup__text popup__text--time">Заезд после ${checkin}, выезд до ${checkout}</p>
  <p class="popup__description">${description}</p>
  <ul class="popup__features">
    ${renderFeatures(features)}
  </ul>
    ${renderPhotos(photos)}
  <img src=${avatar} class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
  </section>`;

  // Создание обычных меок на карте из массива объектов
  apartments.forEach((apartment) => {
    const { offer: { address: { lat, lng }}} = apartment;
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
