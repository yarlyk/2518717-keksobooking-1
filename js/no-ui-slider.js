import { validateField } from './validate-form.js';

const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeHousingSelect = document.querySelector('#type');

export const MinPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

const MAX_PRICE = 100000;

let currentStatePrice = 0;

export const updateSetUiSlider = () => {
  const minPrice = MinPrices[typeHousingSelect.value.toUpperCase()];
  priceInput.placeholder = `от ${minPrice}`;
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: MinPrices[typeHousingSelect.value.toUpperCase()],
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

export const setSliderValue = (value) => {
  sliderElement.noUiSlider.set(value);
};

priceInput.addEventListener('input', ({ target }) => {
  const value = target.value.trim();
  currentStatePrice = value.length ? Number(value) : -1;
  setSliderValue(Number(target.value));
});

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  if (currentStatePrice < 0) {
    priceInput.value = '';
  } else {
    priceInput.value = value;
  }
  currentStatePrice = value;
  validateField(priceInput);
});

updateSetUiSlider();

typeHousingSelect.addEventListener('change', updateSetUiSlider);
