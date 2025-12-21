//Находим элементы на странице
const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeHousingSelect = document.querySelector('#type');

// Объект с минимальными ценами для каждого типа жилья
const MinPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000
};

/**
* Функция обновления настроек слайдера
*/
export const updateSetUiSlider = () => {
  const minPrice = MinPrices[typeHousingSelect.value.toUpperCase()];
  // Обновляем настройки слайдера
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: minPrice,
      max: 100000,
    },
    start: minPrice,
  });
};

export const createUiSlider = () => {
  //Создание слайдера в определённом элементе разметки
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: MinPrices[typeHousingSelect.value.toUpperCase()],
    step: 100,
    connect: 'lower',
  });

  // Получение значений положения слайдера
  sliderElement.noUiSlider.on('update', () => {
    priceInput.value = sliderElement.noUiSlider.get();
  });

  /**
   * Функция обновления настроек слайдера
   */
  updateSetUiSlider();

  // Отслеживаем изменения поля выбора типа жилья
  typeHousingSelect.addEventListener('change', updateSetUiSlider);
};
