import {enableForm, enableFilter} from './control-form.js';

const url = 'https://2.javascript.htmlacademy.pro/keksobooking';
const DataUrl = {
  GET_DATA_URL: `${url}/data`,
  SEND_DATA_URL: `${url}/`
};

// Удаляем использование intervalId из текста ошибки
const TextErrorMessege = {
  GET_DATA_ER: 'Не удаётся получить данные. Обратитесь в поддержку',
  SEND_DATA_ER: 'Не удаётся отправить данные'
};

const timeShowErrorMessage = 7000;

/**
 * Функция для отображения ошибки с отсчетом времени
 * @param {String} message - текст ошибки
 * @param {Number} timeout - время в миллисекундах, через которое сообщение самоуничтожится
 */
const showError = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorMessage = errorElement.querySelector('.error__message');
  const errorButton = errorElement.querySelector('.error__button');
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

  let timeLeft = timeShowErrorMessage / 1000;

  // Обновляем текст с отсчетом
  const updateCountdown = () => {
    timeElement.textContent = `Агент Хант, это сообщение самоуничтожится через ${timeLeft} сек.`;
  };

  updateCountdown();

  // Запускаем интервал для отсчета
  const countdownInterval = setInterval(() => {
    timeLeft--;
    updateCountdown();

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

  // Добавляем самоуничтожение сообщения об ошибке через установленный интервал времени
  const autoRemoveTimeout = setTimeout(() => {
    errorElement.remove();
    enableForm();
    enableFilter();
  }, timeShowErrorMessage);

  // Очистка таймеров при удалении элемента
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
      throw new Error(`Ошибка загрузки данных. Код ошибки: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    // Используем перехваченную ошибку для показа сообщения
    showError(`${TextErrorMessege.GET_DATA_ER}`);
    return [];
  });

export { createLoader };
