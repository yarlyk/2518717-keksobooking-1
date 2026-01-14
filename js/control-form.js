import { SubmitButtonText } from './constants.js';
import { resetSetFilter } from './filter-sort.js';
import { avatarPreview, resetFotoAppartment } from './load-images.js';
import { closeAllPopups, resetMainPin, resetMap } from './map.js';
import { updateSetUiSlider } from './no-ui-slider.js';
import { resetValidate, formAd } from './validate-form.js';

const resetButton = document.querySelector('.ad-form__reset');
const submitButton = document.querySelector('.ad-form__submit');
export const mapFilter = document.querySelector('.map__filters');

export const disableElement = (element, isDisabled = true) => {
  if (isDisabled) {
    element.classList.add('ad-form--disabled');
  } else {
    element.classList.remove('ad-form--disabled');
  }
  const fieldsets = element.querySelectorAll('fieldset');
  fieldsets.forEach((fieldset) => {
    fieldset.disabled = isDisabled;
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
  resetSetFilter();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAll();
});
