export const formAd = document.querySelector('.ad-form');
const quantityRooms = document.querySelector('#room_number');
const quantityGuests = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');


const notForGuests = 0;
const qntyRoomsNotForGuests = 100;
const singleRoom = 1;

const pristine = new Pristine(formAd, {

  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'has-success',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
},);

pristine.addValidator(quantityGuests, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === qntyRoomsNotForGuests && Number(value) !== notForGuests || maxGuests !== qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return false;
  } else if (maxGuests === qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return true;
  } else {
    return Number(value) <= maxGuests;
  }
}, (value) => {
  const maxGuests = Number(quantityRooms.value);
  if (maxGuests === qntyRoomsNotForGuests && Number(value) !== notForGuests) {
    return 'Это не для гостей';
  } else if (maxGuests === singleRoom && Number(value) !== notForGuests) {
    return 'Количество гостей в одной комнате не может быть больше одного';
  } else if (maxGuests !== qntyRoomsNotForGuests && Number(value) === notForGuests) {
    return `Необходимо указать соответствующее количество комнат (${qntyRoomsNotForGuests} комнат)`;
  } else {
    return `Количество гостей в ${maxGuests} комнатах не может быть больше ${maxGuests}`;
  }
});

const updateGuestConstraints = () => {
  pristine.reset(quantityGuests);
  pristine.validate(quantityGuests);
};

export const resetValidate = () => pristine.reset();

const syncTimes = (event) => {
  const selectedValue = event.target.value;

  if (event.target.id === 'timein') {
    timeOut.value = selectedValue;
  } else if (event.target.id === 'timeout') {
    timeIn.value = selectedValue;
  }
};

quantityRooms.addEventListener('change', updateGuestConstraints);
timeIn.addEventListener('change', syncTimes);
timeOut.addEventListener('change', syncTimes);

export const isValid = () => pristine.validate();
