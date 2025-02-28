import { disableForm, disableFilter } from './control-form.js';
import { initMap } from './map.js';
import { createUiSlider } from './no-ui-slider.js';
import { validatingFormSubmit } from './validate-form.js';
import { createLoader } from './get-send-data.js';

// Осуществляем вызовы функций блокировки формы подачи объявления и фильтра до загрузки карты
disableForm();
disableFilter();

// Вызываем слайдер на странице
createUiSlider();

// Вызываем валидацию формы подачи объявления
validatingFormSubmit();

// Загружаем данные с сервера и инициализируем карту
createLoader()
  .then((apartments) => {
    if (apartments.length > 0) {
      initMap(apartments);
    }
  });
