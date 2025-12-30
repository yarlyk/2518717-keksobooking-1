export const getDeclension = (arr, element) => {
  const lastDigit = element % 10;
  if (arr.length < 3) {
    if (element > 1) {
      return arr[1];
    }
    return arr[0];
  }
  if (lastDigit === 1 && element !== 11) {
    return arr[0];
  }
  if (lastDigit > 1 && lastDigit < 5 && element !== 12 && element !== 13 && element !== 14) {
    return arr[1];
  }
  return arr[2];
};

export const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
