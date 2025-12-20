import { BaseCoordinations, MAP_SCALE } from './constants.js';
import { createCustomPopup } from './render-baloon.js';

const addressMarker = document.querySelector('#address');

let map;
let markerGroup;
let marker;
const ordinaryIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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
  markerGroup = L.layerGroup().addTo(map);
  // Указываем параметры главной метки
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

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

  marker.on('moveend', (evt) => {
    const geoMarker = evt.target.getLatLng();
    addressMarker.value = `${geoMarker.lat}, ${geoMarker.lng}`;
  });
});

export const resetMainPin = () => {
  marker.setLatLng({
    lat: 35.6854195988901,
    lng: 139.7527348995209
  });
};

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

export const renderData = (apartments) => {
  apartments.forEach((apartment) => {
    createMarker(apartment);
  });

};

export const closeAllPopups = () => {
  if (map) {
    map.closePopup();
  }
};
