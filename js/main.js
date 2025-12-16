import { disableForm, disableFilter } from './control-form.js';
import { createUiSlider } from './no-ui-slider.js';
import { validatingFormSubmit, blockSubmitButton } from './validate-form.js';
import { unblockSubmitButton, sendAd, showApartments } from './get-send-data.js';
import { showMessage } from './maker-massage-success-error.js';

// Осуществляем вызовы функций блокировки формы подачи объявления и фильтра до загрузки карты
disableForm();
disableFilter();

// Вызываем слайдер на странице
createUiSlider();

// Вызываем валидацию формы подачи объявления
validatingFormSubmit((data) => {
  try {
    blockSubmitButton();
    sendAd(data);
    unblockSubmitButton();
    showMessage('Ушло');
  } catch {
    showMessage('Не ушло!!!');
  }
});

// Загружаем данные с сервера и инициализируем карту
showApartments();

// sendAdSubmi
