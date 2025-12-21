import { SubmitButtonText } from './constants.js';
import { avatarPreview, resetFotoAppartment } from './load-images.js';
import { closeAllPopups, resetMainPin, resetMap } from './map.js';
import { updateSetUiSlider } from './no-ui-slider.js';
import { resetValidate, formAd } from './validate-form.js';

const resetButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
const fieldSets = formAd.querySelectorAll('fieldset');
const mapFilter = document.querySelector('.map__filters');
const filters = mapFilter.querySelectorAll('fieldset');

/**
 * Деактивирует форму подачи объявления с параметром по умолчанию. С параметром false активирует форму
 */
export const disableForm = (isDisabled = true) => {
  if (isDisabled) {
    formAd.classList.add('ad-form--disabled');
  } else {
    formAd.classList.remove('ad-form--disabled');
  }
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = isDisabled;
  });
};

/**
 * Деактивирует форму фильтра с параметром по умолчанию. С параметром false активирует фильтр
 */
export const disableFilter = (isDisabled = true) => {
  if (isDisabled) {
    mapFilter.classList.add('ad-form--disabled');
  } else {
    mapFilter.classList.remove('ad-form--disabled');
  }
  filters.forEach((filter) => {
    filter.disabled = isDisabled;
  });
};

export const blockSubmitButton = (isDisabled = true) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

export const resetAll = () => {
  mapFilter.reset();
  formAd.reset();
  updateSetUiSlider();
  resetValidate();
  avatarPreview.src = 'img/muffin-grey.svg';
  avatarPreview.alt = 'Аватар пользователя';
  resetMainPin();
  resetFotoAppartment();
  closeAllPopups();
  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAll();
});
