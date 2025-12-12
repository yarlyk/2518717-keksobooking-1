


// Перечисление текста ошибки
const TextErrorMessage = {
  GET_DATA_ER: 'Не удаётся получить данные. Обратитесь в поддержку',
  SEND_DATA_ER: 'Не удаётся отправить данные'
};

// Задаем время показа сообщения об ошибке
const timeShowErrorMessage = 7000;

/**
 * Функция для отображения ошибки с отсчетом времени
 * @param {String} message - текст ошибки
 */
const showError = (message) => {
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
  let timeLeft = timeShowErrorMessage / 1000;

  const text1 = document.createTextNode('Агент Хант, это сообщение самоуничтожится');
  const text2 = document.createTextNode('');
  const br = document.createElement('br');

  timeElement.appendChild(text1);
  timeElement.appendChild(br);
  timeElement.appendChild(text2);

  /**
 * Функция для обновления текста обратного отсчёта
  * @param {Number} timeLeft - время в секундах, через которое сообщение самоуничтожится
 */
  const updateCountdown = () => {
    text2.textContent = `через ${timeLeft} сек.`;
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
    window.location.reload(); // Перезагружаем страницу
  });

  // Добавляем ошибку в DOM
  document.body.appendChild(errorElement);

  // Добавляем самоуничтожение сообщения об ошибке через установленный интервал времени и
  // снимаем блокировку с фильтра и формы отправки объявления
  const autoRemoveTimeout = setTimeout(() => {
    errorElement.remove();
    enableForm();
    enableFilter();
  }, timeShowErrorMessage);

  // Очистка таймеров при удалении сообщения об ошибке
  errorElement.addEventListener('remove', () => {
    clearInterval(countdownInterval);
    clearTimeout(autoRemoveTimeout);
  });
};

export { showError };
