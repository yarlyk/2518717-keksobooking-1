// Находим элементы формы
const validatingForm = document.querySelector('.ad-form');
const quantityRooms = document.querySelector('#room_number');
const quantityGuests = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const avatarInput = document.querySelector('#avatar');
const fotoOfApartment = document.querySelector('#images');

//Добавляем атрибут accept в загрузчики, чтобы только изображения п.3.7 ТЗ
avatarInput.accept = "image/jpeg, image/png, image/gif, image/webp"
fotoOfApartment.accept = "image/jpeg, image/png, image/gif, image/webp"

//Определяем переменные для валидации комнат "Не для гостей"
const notForGuests = 0;
const qntyRoomsNotForGuests = 100;
const singleRoom = 1;

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

const validatingFormSubmit = () => {
  validatingForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

/**
 * Валидация поля "Количество мест" в зависимости от значения поля "Количество комнат"
 * @param { * } quantityGuests - элемент формы для валидации
 * @param { Function } handler - обработчик валидации
 * @param { number } value - значение из поля "Количество мест" в обработчике валидации
 * @param { Function } - третий параметр валидатора - текст ошибки, реализован анонимной функцией
 */
pristine.addValidator(quantityGuests, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === qntyRoomsNotForGuests && Number(value) !== notForGuests || maxGuests !== qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return false;
  } else if (maxGuests === qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return true;
  } else {
    return Number(value) <= maxGuests;
  }
}, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === qntyRoomsNotForGuests && Number(value) !== notForGuests) {
    return 'Это не для гостей';
  } else if (maxGuests === singleRoom && Number(value) !== notForGuests) {
    return 'Количество гостей в одной комнате не может быть больше одного';
  } else if (maxGuests !== qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return `Необходимо указать соответствующее количество комнат (${qntyRoomsNotForGuests} комнат)`;
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

// Обработчик изменения количества комнат
quantityRooms.addEventListener('change', updateGuestConstraints);
// Обработчики событий для полей "Время заезда и выезда"
timeIn.addEventListener('change', syncTimes);
timeOut.addEventListener('change', syncTimes);

export { validatingFormSubmit };
