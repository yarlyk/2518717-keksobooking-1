// import { generateRooms } from './data.js';
import { disableForm, disableFilter } from './control-form.js';
import { initMap } from './map.js';
import { createUiSlider} from './no-ui-slider.js';
import { validatingFormSubmit } from './validate-form.js';

// Осуществляем вызовы функций блокировки формы подачи объявления и фильтра до загрузки карты
disableForm();
disableFilter();

//Вызываем слайдер на странице
createUiSlider();

// Вызываем валидацию формы подачи объявления
validatingFormSubmit();

fetch('https://28.javascript.htmlacademy.pro/keksobooking/data')
  .then((response) => response.json())
  .then((apartments) => {
    initMap(apartments);
  });
