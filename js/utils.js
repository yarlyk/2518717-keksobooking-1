const getRandomInteger = (beginingRange, endRange, qtyAfterPoint = 0) => {
  let i;
  if (endRange - beginingRange > 0) {
    i = beginingRange + Math.random() * (endRange - beginingRange);
    return Number(i.toFixed(qtyAfterPoint));
  }
  return NaN;
};

const createUniqUser = () => {
  const i = getRandomInteger(1, 10);
  return i < 10 ? `0${i}` : i;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getRandomObjectElement = (elementsValues, elements) => elementsValues[getRandomArrayElement(elements)];

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
