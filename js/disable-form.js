const disableElement = (element, tag) => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  const findedElement = document.querySelector(element);
  const fieldSets = findedElement.querySelectorAll(tag);
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = true;
  });
};

const ableElement = (element, tag) => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  const findedElement = document.querySelector(element);
  const fieldSets = findedElement.querySelectorAll(tag);
  fieldSets.forEach((fieldSet) => {
    fieldSet.disabled = false;
  });
};

export{ disableElement, ableElement };
