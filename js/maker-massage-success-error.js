export const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.cloneNode(true);
  const successElement = successTemplate.querySelector('.success');

  document.body.appendChild(successElement);

  const closeMessage = () => {
    successElement.remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onClickOutside = (evt) => {
    if (successElement.contains(evt.target)) {
      closeMessage();
    }
  };

  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);

  successElement.addEventListener('remove', () => {
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onClickOutside);
  });
};

export const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');

  document.body.appendChild(errorElement);

  const closeMessage = () => {
    errorElement.remove();
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  const onClickOutside = (evt) => {
    if (errorElement.contains(evt.target)) {
      closeMessage();
    }
  };

  const onButtonClick = () => {
    closeMessage();
  };

  const errorButton = errorElement.querySelector('.error__button');

  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onClickOutside);
  errorButton.addEventListener('click', onButtonClick);

  errorElement.addEventListener('remove', () => {
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onClickOutside);
    errorButton.removeEventListener('click', onButtonClick);
  });
};

const timeShowMessage = 3000;

export const showMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.cloneNode(true);
  const errorElement = errorTemplate.querySelector('.error');
  const errorMessage = errorElement.querySelector('.error__message');
  const errorButton = errorElement.querySelector('.error__button');
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
    errorElement.remove();
  });


  document.body.appendChild(errorElement);

  const autoRemoveTimeout = setTimeout(() => {
    errorElement.remove();
  }, timeShowMessage);

  errorElement.addEventListener('remove', () => {
    clearInterval(countdownInterval);
    clearTimeout(autoRemoveTimeout);
    errorButton.removeEventListener('click');
  });
};
