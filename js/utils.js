const TYPE_LOCATION = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIME_CHECK = ['12:00', '13:00', '14:00'];
const TYPE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION_ROOMS = [
  'Уютный номер с прекрасным видом',
  'Просторный, светлый номер',
  'Комфорт для гостей - наш приоритет',
  'Прекрасный номер для полноценного отдыха',
  'Побывав здесь, Вы обязательно вернётесь!',
];
const PHOTO_ROOMS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TITLE_ROOMS = [
  'Лучший номер10',
  'Лучшее сочетание "Цена-качество"',
  'Наш дивиз - "Чистота и забота!"',
  'Ваш отдых - наше призвание!',
  'Три номера по цене двух!',
  'У нас скучно не будет!',
];

const getRandomInteger = (beginingRange, endRange, qtyAfterPoint = 0) => {
  let i;
  if (endRange - beginingRange > 0) {
    i = beginingRange + Math.random() * (endRange - beginingRange);
    return Number(i.toFixed(qtyAfterPoint));
  }
  return NaN;
};

const CreateUniqUser = () => {
  const i = getRandomInteger(1, 10);
  return i < 10 ? `0${i}`: i;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

function getRandomArray(array) {
  const previousValues = [];
  const lengthArray = getRandomInteger(1, array.length);
  let currentValue = array[getRandomInteger(0, array.length - 1)];
  for (let index = 0; index < lengthArray; index++) {
    while (
      previousValues.includes(currentValue) ||
      previousValues.length >= lengthArray
    ) {
      currentValue = array[getRandomInteger(0, array.length - 1)];
    }
    previousValues.push(currentValue);
  }
  return previousValues;
}

export{getRandomArray};
export{getRandomArrayElement};
export{getRandomInteger};
export{CreateUniqUser};
export{TYPE_LOCATION};
export{TIME_CHECK};
export{TYPE_FEATURES};
export{DESCRIPTION_ROOMS};
export{PHOTO_ROOMS};
export{TITLE_ROOMS};
