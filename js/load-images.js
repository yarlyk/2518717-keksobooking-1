export const avatarInput = document.querySelector('#avatar');
export const avatarPreview = document.querySelector('.ad-form-header__preview img');
export const fotoOfApartment = document.querySelector('#images');


//Добавляем атрибут accept в загрузчики, чтобы только изображения п.3.7 ТЗ
avatarInput.accept = 'image/jpeg, image/png, image/gif, image/webp';
fotoOfApartment.accept = 'image/jpeg, image/png, image/gif, image/webp';

const fotoAppartmentPreview = document.querySelector('.ad-form__photo');
// const fotoAppartment = document.createElement('img');

export const initImageUploadAvatar = () => {
  avatarInput.addEventListener('change', () => {
    const file = avatarInput.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      avatarPreview.src = fileUrl;
      avatarPreview.alt = 'Загруженный аватар пользователя';
    }
  });
};

export const initImageUploadAppartment = () => {
  fotoOfApartment.addEventListener('change', () => {
    const file = fotoOfApartment.files[0];

    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fotoAppartment = document.createElement('img');
      fotoAppartment.src = fileUrl;
      fotoAppartment.alt = 'Загруженный пользователем';
      fotoAppartment.width = '70';
      fotoAppartment.height = '70';
      fotoAppartmentPreview.appendChild(fotoAppartment);
      // console.log(fotoAppartmentPreview);
    }
  });
};

export const resetFotoAppartment = () => {
  const img = fotoAppartmentPreview.querySelector('img');
  if (img) {
    img.remove();
  }
};
