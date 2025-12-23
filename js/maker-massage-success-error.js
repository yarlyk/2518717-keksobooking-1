// Функция для отображения успешного сообщения
export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');

  // Добавляем сообщение перед закрывающим тегом body
  document.body.appendChild(successElement);

  // Функция для закрытия сообщения
  const closeMessage = () => {
    successElement.remove();
  };

  // Обработчик нажатия клавиши Esc
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  // Обработчик клика по произвольной области экрана
  const onClickOutside = (evt) => {
    if (successElement.contains(evt.target)) {
      closeMessage();
    }
  };

  // Добавляем обработчики событий
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);

  // Удаляем обработчики при удалении элемента
  successElement.addEventListener('remove', () => {
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onClickOutside);
  });
};

// Функция для отображения сообщения об ошибке
export const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');

  // Добавляем сообщение перед закрывающим тегом body
  document.body.appendChild(errorElement);

  // Функция для закрытия сообщения
  const closeMessage = () => {
    errorElement.remove();
  };

  // Обработчик нажатия клавиши Esc
  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  // Обработчик клика по произвольной области экрана
  const onClickOutside = (evt) => {
    if (errorElement.contains(evt.target)) {
      closeMessage();
    }
  };

  // Обработчик клика по кнопке
  const onButtonClick = () => {
    closeMessage();
  };

  // Находим кнопку в сообщении об ошибке
  const errorButton = errorElement.querySelector('.error__button');

  // Добавляем обработчики событий
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
  errorButton.addEventListener('click', onButtonClick);

  // Удаляем обработчики при удалении элемента
  errorElement.addEventListener('remove', () => {
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onClickOutside);
    errorButton.removeEventListener('click', onButtonClick);
  });
};

// Задаем время показа сообщения об ошибке
const timeShowMessage = 3000;

/**
 * Функция для отображения ошибки с отсчетом времени
 * @param {String} message - текст ошибки
 */
export const showMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorMessage = errorElement.querySelector('.error__message'); // Отображение поля сообщения
  const errorButton = errorElement.querySelector('.error__button'); // Отображение кнопки
  const timeElement = document.createElement('div'); // Для отображения отсчета

  // Добавляем стили для элемента времени
  timeElement.style.cssText = `
    margin-top: 50px;
    font-size: 50 px;
    color: #d8dbd99c;
  `;

  // Устанавливаем сообщение об ошибке
  errorMessage.textContent = message;

  // Добавляем элемент для обратного отсчета
  errorMessage.appendChild(timeElement);

  // Объявляю переменную для обратного отсчёта
  let timeLeft = timeShowMessage / 1000;

  const text = document.createTextNode('');

  timeElement.appendChild(text);

  /**
 * Функция для обновления текста обратного отсчёта
  * @param {Number} timeLeft - время в секундах, через которое сообщение самоуничтожится
 */
  const updateCountdown = () => {
    text.textContent = `Закроется через ${timeLeft} сек.`;
  };

  updateCountdown();

  // Запускаем интервал для обратного отсчета
  const countdownInterval = setInterval(() => {
    timeLeft--;
    updateCountdown();

    // Останавливаем бесконечный setInterval при достижении timeLeft 0
    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  // Добавляем обработчик для кнопки "Попробовать снова"
  errorButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    errorElement.remove();
    // window.location.reload(); // Перезагружаем страницу
  });

  // Добавляем ошибку в DOM
  document.body.appendChild(errorElement);

  // Добавляем самоуничтожение сообщения об ошибке через установленный интервал времени
  const autoRemoveTimeout = setTimeout(() => {
    errorElement.remove();
  }, timeShowMessage);

  // Очистка таймеров при удалении сообщения об ошибке
  errorElement.addEventListener('remove', () => {
    clearInterval(countdownInterval);
    clearTimeout(autoRemoveTimeout);
    errorButton.removeEventListener('click');
  });
};
