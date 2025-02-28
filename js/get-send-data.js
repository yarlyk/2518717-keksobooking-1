const dataUrl = {
  GET_DATA_URL: 'https://28.javascript.htmlacademy.pro/keksobooking/data',
  SEND_DATA_URL: 'https://28.javascript.htmlacademy.pro/keksobooking/'
};

// Функция для отображения ошибки
const showError = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorMessage = errorElement.querySelector('.error__message');
  const errorButton = errorElement.querySelector('.error__button');

  // Устанавливаем сообщение об ошибк
  errorMessage.textContent = message;

  // Добавляем обработчик для кнопки "Попробовать снова"
  errorButton.addEventListener('click', () => {
    errorElement.remove();
    window.location.reload(); // Перезагружаем страницу
  });

  // Добавляем ошибку в DOM
  document.body.appendChild(errorElement);
};

const createLoader = () => fetch(dataUrl.GET_DATA_URL)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных. Код ошибки: ${response.status}`);
    }
    return response.json();
  })
  .catch((error) => {
    showError(`${error.message}`);
    return []; // Возвращаем пустой массив, чтобы не сломать код
  });

export { createLoader };
