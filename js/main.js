import { generateRooms } from './data.js';
import { disableForm, disableFilter } from './control-form.js';
import { initMap } from './map.js';
import { createUiSlider} from './no-ui-slider.js';
import { validatingFormSubmit } from './validate-form.js';

// Осуществляем вызовы функций блокировки формы подачи объявления и фильтра до загрузки карты
disableForm();
disableFilter();

// Генерация массива со случайными объектами для заселения. Количество объктов передаём в качестве параметра
const estateObjects = generateRooms(8);

// Создаём карту с метками, и, в случае удачной инициализации, разблокируем фильтр и форму подачи объявления
initMap(estateObjects);

//Вызываем слайдер на странице
createUiSlider();

// Вызываем валидацию формы подачи объявления
validatingFormSubmit();
