export const avatarInput = document.querySelector('#avatar');
export const avatarPreview = document.querySelector('.ad-form-header__preview img');
export const fotoOfApartment = document.querySelector('#images');
const fotoAppartmentPreview = document.querySelector('.ad-form__photo');

//Добавляем атрибут accept в загрузчики, чтобы можно было загрузить только изображения п.3.7 ТЗ
avatarInput.accept = 'image/jpeg, image/png, image/gif, image/webp';
fotoOfApartment.accept = 'image/jpeg, image/png, image/gif, image/webp';

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
    }
  });
};

export const resetFotoAppartment = () => {
  const images = fotoAppartmentPreview.querySelectorAll('img');
  if (images.length > 0) {
    images.forEach((image) => {
      image.remove();
    });
  }
};
