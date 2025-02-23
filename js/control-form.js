/**
 * Деактивирует форму подачи объявления
 */
const disableForm = () => {
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
const enableForm = () => {
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
const disableFilter = () => {
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
const enableFilter = () => {
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

export{ disableForm, enableForm, disableFilter, enableFilter };
