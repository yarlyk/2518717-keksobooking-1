import { BaseCoordinations, MAP_SCALE } from './constants.js';
import { createCustomPopup } from './render-baloon.js';

const addressMarker = document.querySelector('#address');

let map;
export let markerGroup;
/**
 * Создаёт слой на карте
 */
export const makeLayer = () => {
  markerGroup = L.layerGroup().addTo(map);
};
let marker;
// Указываем параметры обычной метки
const ordinaryIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
/**
 *Инициализирует карту
 */
export const initMap = () => new Promise((resolve) => {
  map = L.map('map-canvas')
    .on('load', () => {
      resolve(true);
    })
    .setView({
      lat: BaseCoordinations.LAT,
      lng: BaseCoordinations.LNG
    }, MAP_SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  makeLayer();
  // Указываем параметры главной метки
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });
  // Добвляем главную метку на карту. Выносим вперед
  marker = L.marker(
    {
      lat: BaseCoordinations.LAT,
      lng: BaseCoordinations.LNG
    },
    {
      draggable: true,
      icon: mainPinIcon,
      zIndexOffset: 1000
    },
  ).addTo(map);
  // Отслеживание положения главной метки для передачи в форму объявления с округлением данных
  marker.on('moveend', (evt) => {
    const geoMarker = evt.target.getLatLng();
    addressMarker.value = `${geoMarker.lat.toFixed(5)}, ${geoMarker.lng.toFixed(5)}`;
  });
});
/**
 * Сьрос положения главной метки
 */
export const resetMainPin = () => {
  marker.setLatLng({
    lat: 35.6854195988901,
    lng: 139.7527348995209
  });
};
/**
 * Сброс карты к начльным установкам
 */
export const resetMap = () => {
  map.setView({
    lat: BaseCoordinations.LAT,
    lng: BaseCoordinations.LNG
  }, MAP_SCALE);
};
/**
 *Формирует метку
 * @param {Object} apartment - входящий объект для формирования метки
 */
const createMarker = (apartment) => {
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
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(apartment));
};
/**
 *Создаёт метки на карте
 * @param {Array} apartments - массив для нанесения меток
 */
export const renderData = (apartments) => {
  apartments.forEach((apartment) => {
    createMarker(apartment);
  });
};
/**
 * Сбрасывает балун
 */
export const closeAllPopups = () => {
  if (map) {
    map.closePopup();
  }
};
