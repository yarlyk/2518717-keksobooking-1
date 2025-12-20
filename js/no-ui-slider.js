//Находим элементы на странице
const sliderElement = document.querySelector('.ad-form__slider');
const priceInput = document.querySelector('#price');
const typeHousingSelect = document.querySelector('#type');

// Объект с минимальными ценами для каждого типа жилья
const MinPrices = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
  hotel: 3000
};

export const createUiSlider = () =>{
  //Создание слайдера в определённом элементе разметки
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100000,
    },
    start: 1000,
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
  const updateSetUiSlider = () => {
    const minPrice = MinPrices[typeHousingSelect.value];
    // Обновляем настройки слайдера
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: minPrice,
        max: 100000,
      },
      start: minPrice,
    });
  };

  // Отслеживаем изменения поля выбора типа жилья
  typeHousingSelect.addEventListener('change', updateSetUiSlider);
};
