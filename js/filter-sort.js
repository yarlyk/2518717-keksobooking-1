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

const filterArr = (checkingArr) => {
  const checkedArr = [];
  // Проверяем, есть ли фильтры
  if (setFilter.offer.features.length > 0) {
    setFilter.offer.features.forEach((elem) => {
      checkingArr.forEach((element) => {
        if (element.offer.features) {
          // Используем функцию-колбэк в some()
          const isIt = element.offer.features.some((feature) => feature === elem);
          if (isIt) {
            const isIn = checkedArr.includes(element);
            if (!isIn) {
              checkedArr.push(element);
            }
          }
        }
      });
    });
    // console.log(checkedArr);
    // Возвращаем отфильтрованный массив
    return checkedArr;
  }
  // Если фильтров нет, возвращаем все объявления
  return strangerAds;
};

export const initFilter = (checkingArr) => {
  renderData(strangerAds.slice(0, 10));
  mapFilter.addEventListener('change', (evt) => {
    makeSetFilter(evt);
    markerGroup.remove();
    makeLayer();
    const filteredArr = filterArr(checkingArr);
    renderData(filteredArr.slice(0, 10));
  });
};
