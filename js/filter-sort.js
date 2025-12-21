import { FILTER_TYPES } from './constants.js';
import { mapFilter } from './control-form.js';

const setFilter = {
  'offer': {
    features: []
  }
  // 'housing-type': 'flat',
  // 'housing-price': 'middle',
  // 'housing-rooms': '1',
  // 'housing-guests': '2',
};

// const getingData = {
//   'offer': {
//     'guests': 1,
//     'price': 7500,
//     'rooms': 1,
//     'type': 'palace',
//     'features': ['washer', 'elevator', 'wifi', 'dishwasher', 'conditioner']
//   }
// };

export const initFilter = () => {
  mapFilter.addEventListener('change', (evt) => {
    const matches = FILTER_TYPES.some((it) => evt.target.value.endsWith(it));
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
      setFilter.offer[evt.target.id] = evt.target.value;
    }
    // console.log(setFilter);
  });
};
