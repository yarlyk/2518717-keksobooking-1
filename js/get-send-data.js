import {enableForm, enableFilter} from './control-form.js';

const url = 'https://28.javascript.htmlacademy.pro/keksobooking';
const DataUrl = {
  GET_DATA_URL: `${url}/data`,
  SEND_DATA_URL: `${url}/`
};

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
  const errorMessage = errorElement.querySelector('.error__message'); // Для отображения поля сообщения
  const errorButton = errorElement.querySelector('.error__button'); // Для отображения кнопки
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

  /**
 * Функция для обновления текста обратного отсчёта
  * @param {Number} timeLeft - время в миллисекундах, через которое сообщение самоуничтожится
 */
  const updateCountdown = () => {
    timeElement.textContent = `Агент Хант, это сообщение самоуничтожится через ${timeLeft} сек.`;
  };

  updateCountdown();

  // Запускаем интервал для обратного отсчета
  const countdownInterval = setInterval(() => {
    timeLeft--;
    updateCountdown();

    // Останавливаем бесконечный setInterval при достижении 0
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

/**
 * Функция для получения данных с сервера
 * @returns - возвращает промис, который разрешается либо в массив данных, полученных от сервера, либо в пустой массив, если произошла ошибка.
 */
const createLoader = () => fetch(DataUrl.GET_DATA_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки данных. Что-то данные не подгружаются');
    }
    return response.json();
  })
  .catch((error) => {
    // Используем перехваченную ошибку для показа сообщения и возвращаем пустой массив
    showError(`${TextErrorMessage.GET_DATA_ER}`);
    return [];
  });

export { createLoader };
