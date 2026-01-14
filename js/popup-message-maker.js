import { POPUPS } from './constants.js';
const successTemplate = document
  .querySelector('#success')
  .content.querySelector('.success');
const errorTemplate = document
  .querySelector('#error')
  .content.querySelector('.error');
const body = document.body;

const templates = {
  [POPUPS.SUCCESS]: successTemplate,
  [POPUPS.ERROR]: errorTemplate,
};

const timeShowMessage = 3000;

export const showPopup = (type) => {
  const popupTemplate = templates[type].cloneNode(true);
  body.appendChild(popupTemplate);
  document.addEventListener('keydown', onEscKeyDown);

  const closeMessage = () => {
    popupTemplate.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  function onEscKeyDown(evt) {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  }

  popupTemplate.addEventListener('click', ({ target }) => {
    if (
      target.classList.contains(type) ||
      target.classList.contains(`${type}__button`)
    ) {
      closeMessage();
    }
  });
};

export const showMessage = (message) => {
  const alert = errorTemplate.cloneNode(true);
  const errorMessage = alert.querySelector('.error__message');
  const errorButton = alert.querySelector('.error__button');
  const timeElement = document.createElement('div');

  timeElement.style.cssText = `
    margin-top: 50px;
    font-size: 50 px;
    color: #d8dbd99c;
  `;

  errorMessage.textContent = message;

  errorMessage.appendChild(timeElement);

  let timeLeft = timeShowMessage / 1000;

  const text = document.createTextNode('');

  timeElement.appendChild(text);

  const updateCountdown = () => {
    text.textContent = `Закроется через ${timeLeft} сек.`;
  };

  updateCountdown();

  const countdownInterval = setInterval(() => {
    timeLeft--;
    updateCountdown();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  errorButton.addEventListener('click', () => {
    clearInterval(countdownInterval);
    alert.remove();
    location.reload(true);
  });

  document.body.appendChild(alert);

  const autoRemoveTimeout = setTimeout(() => {
    alert.remove();
  }, timeShowMessage);

  alert.addEventListener('remove', () => {
    clearInterval(countdownInterval);
    clearTimeout(autoRemoveTimeout);
    errorButton.removeEventListener('click');
  });
};
