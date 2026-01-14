import { CheckPrice, FILTER_TYPES, FLATS_COUNT, RERENDER_DELAY } from './constants.js';
import { renderData } from './map.js';
import { debounce } from './utils.js';

const mapFilter = document.querySelector('.map__filters');

let localFlats = [];

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
  renderData(localFlats.slice(0, FLATS_COUNT));
  setFilter.offer.type = 'any';
  setFilter.offer.rooms = 'any';
  setFilter.offer.price = 'any';
  setFilter.offer.guests = 'any';
  setFilter.offer.features = [];
};

const makeSetFilter = (evt) => {
  const matches = FILTER_TYPES.some((it) => evt.target.value === it);
  if (matches) {
    if (evt.target.checked) {
      const isIt = setFilter.offer.features.includes(evt.target.value);
      if (!isIt) {
        setFilter.offer.features.push(evt.target.value);
      }
    } else {
      const index = setFilter.offer.features.indexOf(evt.target.value);
      setFilter.offer.features.splice(index, 1);
    }
  } else {
    const filterType = evt.target.id.replace('housing-', '');
    setFilter.offer[filterType] = evt.target.value;
  }
};

const filterOffers = (filter) => (offerItem) => {
  const { type, price, rooms, guests, features } = filter.offer;
  const offer = offerItem.offer;
  if (type !== 'any' && offer.type !== type) {
    return false;
  }
  if (price !== 'any') {
    if (!CheckPrice[price](offer.price)) {
      return false;
    }
  }
  if (rooms !== 'any' && offer.rooms !== +rooms) {
    return false;
  }
  if (guests !== 'any' && offer.guests !== +guests) {
    return false;
  }
  if (features.length > 0) {
    if (!offer.features || offer.features.length === 0) {
      return false;
    }
    for (const feature of features) {
      if (!offer.features.includes(feature)) {
        return false;
      }
    }
  }
  return true;
};

const debouncedFilterHandler = debounce(() => {
  const filteredArr = localFlats.filter(filterOffers(setFilter));
  renderData(filteredArr.slice(0, FLATS_COUNT));
}, RERENDER_DELAY);

mapFilter.addEventListener('change', (evt) => {
  makeSetFilter(evt);
  debouncedFilterHandler();
});


export const initFilter = (flats) => {
  localFlats = [...flats];
  renderData(localFlats.slice(0, FLATS_COUNT));
};
