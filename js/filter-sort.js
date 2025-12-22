import { strangerAds } from './app.js';
import { FILTER_TYPES } from './constants.js';
import { mapFilter } from './control-form.js';
import { makeLayer, markerGroup, renderData } from './map.js';

const setFilter = {
  offer: {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  },
};

export const resetSetFilter = () => {
  markerGroup.remove();
  makeLayer();
  renderData(strangerAds.slice(0, 10));
  setFilter.offer.type = 'any';
  setFilter.offer.rooms = 'any';
  setFilter.offer.price = 'any';
  setFilter.offer.guests = 'any';
  setFilter.offer.features = [];
};
////////////////////////////////////////////////////////////////////////////////////////////////////////
const makeSetFilter = (evt) => {
  const matches = FILTER_TYPES.some((it) => evt.target.value === it);
  if (matches) {
    if (evt.target.checked) {
      const isIt = setFilter.offer.features.includes(evt.target.value);
      if (!isIt) {
        setFilter.offer.features.push(evt.target.value);
      }
    } else {
      const index = setFilter.offer.features.indexOf(evt.target.value); // находим индекс элемента, который планируем удалить
      setFilter.offer.features.splice(index, 1); // удаляем 1 элемент, начиная с индекса index
    }
  } else {
    const filterType = evt.target.id.replace('housing-', '');
    setFilter.offer[filterType] = evt.target.value;
  }
};
//////////////////////////////////////////////////////////////////////////////////////////
const filterOffers = (filter) => (offerItem) => {
  const { type, price, rooms, guests, features } = filter.offer;
  const offer = offerItem.offer;
  // Проверка типа
  if (type !== 'any' && offer.type !== type) {
    return false;
  }
  // Проверка цены
  if (price !== 'any') {
    const offerPrice = offer.price;
    switch (price) {
      case 'low':
        if (offerPrice >= 10000) {
          return false;
        }
        break;
      case 'middle':
        if (offerPrice < 10000 || offerPrice > 50000) {
          return false;
        }
        break;
      case 'high':
        if (offerPrice < 50000) {
          return false;
        }
        break;
    }
  }
  // Проверка количества комнат
  if (rooms !== 'any' && offer.rooms !== +rooms) {
    return false;
  }
  // Проверка количества гостей
  if (guests !== 'any' && offer.guests !== +guests) {
    return false;
  }
  // Проверка удобств
  if (features.length > 0) {
    // Если в объекте нет удобств, а в фильтре есть - не подходит
    if (!offer.features || offer.features.length === 0) {
      return false;
    }
    // Все удобства из фильтра должны быть в объекте
    for (const feature of features) {
      if (!offer.features.includes(feature)) {
        return false;
      }
    }
  }
  return true;
};
/////////////////////////////////////////////////////////////////////////////////////////////////////
export const initFilter = (checkingArr) => {
  renderData(strangerAds.slice(0, 10));
  mapFilter.addEventListener('change', (evt) => {
    makeSetFilter(evt);
    markerGroup.remove();
    makeLayer();
    const filteredArr = checkingArr.filter(filterOffers(setFilter));
    renderData(filteredArr.slice(0, 10));
  });
};
