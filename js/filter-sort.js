import { FILTER_TYPES } from './constants.js';
import { mapFilter } from './control-form.js';

const setFilter = {
  offer: {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  },
};

export function resetSetFilter() {
  setFilter.offer.type = 'any';
  setFilter.offer.rooms = 'any';
  setFilter.offer.price = 'any';
  setFilter.offer.guests = 'any';
  setFilter.offer.features = [];
}
// resetSetFilter();
// const getingData = {
//   'offer': {
//     'guests': 1,
//     'price': 7500,
//     'rooms': 1,
//     'type': 'palace',
//     'features': ['washer', 'elevator', 'wifi', 'dishwasher', 'conditioner']
//   }
// };

function makeSetFilter(evt) {
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
  console.log(setFilter);
}

export const initFilter = () => {
  mapFilter.addEventListener('change', (evt) => {
    makeSetFilter(evt);

  });
};
