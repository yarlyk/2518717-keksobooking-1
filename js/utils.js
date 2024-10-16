/**
 * Получает случайное число из диапазона с заданным количеством цыфр после запятой
 * @param { number } beginingRange - минимальное число диапазона
 * @param { number } endRange - максимальное число диапазона
 * @param { number } qtyAfterPoint - количество цыфр после запятой
 * @returns - возвращает случайное число из диапазона с заданным количеством цыфр после запятой
 */
const getRandomInteger = (beginingRange, endRange, qtyAfterPoint = 0) => {
  let i;
  if (endRange - beginingRange > 0) {
    i = beginingRange + Math.random() * (endRange - beginingRange);
    return Number(i.toFixed(qtyAfterPoint));
  }
  return NaN;
};

/**
 * Возвращает уникальный двузначный номер пользователя
 * @returns - возвращает число из диапазона и, если оно менее 10, то добавляет 0 впереди
 */
const createUniqUser = () => {
  const i = getRandomInteger(1, 10);
  return i < 10 ? `0${i}` : i;
};

/**
 * Получает случайный элемент массива
 * @param { array } elements - любой массив
 * @returns - возвращает рандомный элемент из массива
 */
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const TypeLocationNamed = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
  HOTEL: 'Отель',
};

/**
 * Преобразует наименование типа помещения на русский язык
 * @param { array } elements - массив с ключами объекта TypeLocationNamed
 * @returns - возвращает тип помещения на русском языке
 */
const getRandomObjectElement = (elements) => TypeLocationNamed[getRandomArrayElement(elements)];

/**
 * Получает новый массив со случайными данными из исходного массива
 * @param { array } array - массив с исходными данными
 * @returns - возвращает массив со случайными данными из исходного массива
 */
const getRandomArray = (array) => {
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
};

export{ getRandomArray, getRandomArrayElement, getRandomInteger, createUniqUser, getRandomObjectElement };
