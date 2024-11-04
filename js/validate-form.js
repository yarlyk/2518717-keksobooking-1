const validatingForm = document.querySelector('.ad-form');

const pristine = new Pristine(validatingForm);
validatingForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
      console.log('Можно отправлять');
  } else {
      console.log('Форма невалидна');
  }
});
