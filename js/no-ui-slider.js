const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeHousingSelect = document.querySelector('#type');

const MinPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

export const updateSetUiSlider = () => {
  const minPrice = MinPrices[typeHousingSelect.value.toUpperCase()];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000,
    },
    start: minPrice,
  });
};

export const createUiSlider = () => {

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: MinPrices[typeHousingSelect.value.toUpperCase()],
    step: 100,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    priceInput.value = sliderElement.noUiSlider.get();
  });

  updateSetUiSlider();

  typeHousingSelect.addEventListener('change', updateSetUiSlider);
};
