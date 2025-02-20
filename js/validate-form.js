// Находим элементы формы
const validatingForm = document.querySelector('.ad-form');
const priceInput = document.querySelector('#price');
const typeHousingSelect = document.querySelector('#type');
const quantityRooms = document.querySelector('#room_number');
const quantityGuests = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

// Объект с минимальными ценами для каждого типа жилья
const MinPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALOW: 0,
  HOTEL: 3000,
};

/**
 * Экземпляр для валидации с объктом config в качестве второго параметра
 * @param { * } validatingForm - элемент формы для валидации
 * @param { object } config - объект с настройками валидации для формы
 * @param { boolean } - не заполнено (по умолчанию true), определяет производить валидацию по мере ввода или по нажатию кнопки "Отправить"
 */
const pristine = new Pristine(validatingForm, {
  // class of the parent element where the error/success class is added
  classTo: 'ad-form__element',
  errorClass: 'has-danger',
  successClass: 'has-success',
  // class of the parent element where error text element is appended
  errorTextParent: 'ad-form__element',
  // type of element to create for the error text
  errorTextTag: 'div',
  // class of the error text element
  errorTextClass: 'text-help'
},);

/**
 * Валидация по событию нажатие кнопки "Отправить"
 * @param { Event } 'submit' - отправка формы
 * @param { Function } handler - обработчик события
 */
validatingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

/**
 * Валидация поля "Цена за ночь"
 * @param { * } priceInput - элемент формы для валидации
 * @param { Function } handler - обработчик валидации
 * @param { number } value - значение из поля "Цена за ночь" в обработчике валидации
 * @param { Function } - третий параметр валидатора - текст ошибки, реализован анонимной функцией
 */
pristine.addValidator(priceInput, (value) => {
  const minPrice = MinPrices[typeHousingSelect.value];
  return value >= minPrice;
}, () => {
  const minPrice = MinPrices[typeHousingSelect.value];
  return `Минимальная цена для выбранного типа жилья ${minPrice} рублей`;
});

/**
 * Функция для обновления атрибутов min и placeholder в теге <input id="price" name="price"> и перевалидации (для удаления предыдущего сообщения об ошибке) после изменения значений атрибутов с указанием сообщения пользователю о несоответствие введённого значения требуемому
 */
const updatePriceConstraints = () => {
  const minPrice = MinPrices[typeHousingSelect.value];
  // Устанавливаем минимальное значение для валидации
  priceInput.min = minPrice;
  // Обновляем плейсхолдер
  priceInput.placeholder = `${minPrice}`;
  pristine.reset(priceInput);
  pristine.validate(priceInput);
};

// Обработчик изменения выбора типа жилья
typeHousingSelect.addEventListener('change', updatePriceConstraints);

/**
 * Валидация поля "Количество мест" в зависимости от значения поля "Количество комнат"
 * @param { * } quantityGuests - элемент формы для валидации
 * @param { Function } handler - обработчик валидации
 * @param { number } value - значение из поля "Количество мест" в обработчике валидации
 * @param { Function } - третий параметр валидатора - текст ошибки, реализован анонимной функцией
 */
pristine.addValidator(quantityGuests, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === 100 && Number(value) !== 0 || maxGuests !== 100 && Number(value) === 0) {
    return false;
  } else if (maxGuests === 100 && Number(value) === 0) {
    return true;
  } else {
    return Number(value) <= maxGuests;
  }
}, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === 100 && Number(value) !== 0) {
    return 'Это не для гостей';
  } else if (maxGuests === 1 && Number(value) !== 0) {
    return 'Количество гостей в одной комнате не может быть больше одного';
  } else if (maxGuests !== 100 && Number(value) === 0) {
    return 'Необходимо указать соответствующее количество комнат (100 комнат)';
  } else {
    return `Количество гостей в ${maxGuests} комнатах не может быть больше ${maxGuests}`;
  }
});

/**
 * Функция для перевалидации (для удаления предыдущего сообщения об ошибке) после изменения значений выбора с указанием сообщения пользователю о несоответствие выбранных значений требуемым
 */
const updateGuestConstraints = () => {
  pristine.reset(quantityGuests);
  pristine.validate(quantityGuests);
};

// Обработчик изменения количества комнат
quantityRooms.addEventListener('change', updateGuestConstraints);

/**
 * Функция для синхронизации значений полей Время заезда и Время выезда
 * @param { * } event - представляет собой любое событие, которое происходит в DOM
 */
const syncTimes = (event) => {
  const selectedValue = event.target.value;

  if (event.target.id === 'timein') {
    timeOut.value = selectedValue;
  } else if (event.target.id === 'timeout') {
    timeIn.value = selectedValue;
  }
};

// Добавляем обработчики событий для обоих полей
timeIn.addEventListener('change', syncTimes);
timeOut.addEventListener('change', syncTimes);
