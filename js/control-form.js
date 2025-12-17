import { SubmitButtonText } from './constants.js';


const submitButton = document.querySelector('.ad-form__submit');
/**
 * Деактивирует форму подачи объявления
 */
export const disableForm = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  const findedElement = document.querySelector('.ad-form');
  const fieldSets = findedElement.querySelectorAll('fieldset');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = true;
  });
};

/**
 * Активирует форму подачи объявления
 */
export const enableForm = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  const findedElement = document.querySelector('.ad-form');
  const fieldSets = findedElement.querySelectorAll('fieldset');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = false;
  });
};

/**
 * Деактивирует форму фильтра
 */
export const disableFilter = () => {
  document.querySelector('.map__filters').classList.add('ad-form--disabled');
  const findedElement = document.querySelector('.map__filters');
  let fieldSets = findedElement.querySelectorAll('fieldset');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = true;
  });
  fieldSets = findedElement.querySelectorAll('select');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = true;
  });
};

/**
 * Активирует форму фильтра
 */
export const enableFilter = () => {
  document.querySelector('.map__filters').classList.remove('ad-form--disabled');
  const findedElement = document.querySelector('.map__filters');
  let fieldSets = findedElement.querySelectorAll('fieldset');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = false;
  });
  fieldSets = findedElement.querySelectorAll('select');
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = false;
  });
};

export const blockSubmitButton = (isDisabled = true) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};




