import { enableForm } from './control-form.js';
import { estateObjects } from "./main.js";

const initMap = () => {
  const addressMarker = document.querySelector('#address');

  const map = L.map('map-canvas')
    .on('load', () => {
      enableForm(); // Форма активируется после загрузки карты
    })
    .setView({
      lat: 35.6854195988901,
      lng: 139.7527348995209
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const marker = L.marker(
    {
      lat: 35.685434,
      lng:139.752735
    },
    {
      draggable: true,
      icon: mainPinIcon
    },
  ).addTo(map);

  marker.on('moveend', (evt) => {
    const geoMarker = evt.target.getLatLng();
    addressMarker.value = `${geoMarker.lat} ${geoMarker.lng}`;
  });

  const ordinaryIcon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const randomAddress = L.marker(
    {
      lat: estateObjects[0].offer.address.lat,
      lng: estateObjects[0].offer.address.lng
    },
    {
    //   draggable: true,
      icon: ordinaryIcon
    },
  );
  randomAddress.addTo(map);
};

export { initMap };
