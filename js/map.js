import { BaseCoordinations, MAP_SCALE } from './constants.js';
import { createCustomPopup } from './render-baloon.js';

 const addressMarker = document.querySelector('#address');

let map;

const ordinaryIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

export const initMap = () => new Promise((resolve) => {
  map = L.map('map-canvas')
    .on('load', () => {
      resolve(true)
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

  // Указываем параметры главной метки
  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: BaseCoordinations.LAT,
      lng: BaseCoordinations.LNG
    },
    {
      draggable: true,
      icon: mainPinIcon
    },
  ).addTo(map);

  marker.on('moveend', (evt) => {
    const geoMarker = evt.target.getLatLng();
    addressMarker.value = `${geoMarker.lat}, ${geoMarker.lng}`;
  });
});

export const renderData = (apartments) => {
  console.log(apartments)
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
}

