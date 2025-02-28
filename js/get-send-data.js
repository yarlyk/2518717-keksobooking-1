const url = 'https://28.javascript.htmlacademy.pro/keksobooking';
const DataUrl = {
  GET_DATA_URL: `${url}/data`,
  SEND_DATA_URL: `${url}/`
};


/**
 * Функция для отображения ошибки
 * @param { String } message - текст ошибки
 */
const showError = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorMessage = errorElement.querySelector('.error__message');
  const errorButton = errorElement.querySelector('.error__button');

  // Устанавливаем сообщение об ошибке
  errorMessage.textContent = message;

  // Добавляем обработчик для кнопки "Попробовать снова"
  errorButton.addEventListener('click', () => {
    errorElement.remove();
    window.location.reload(); // Перезагружаем страницу
  });

  // Добавляем ошибку в DOM
  document.body.appendChild(errorElement);
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
    showError(`${error.message}`);
    return [];
  });

export { createLoader };
