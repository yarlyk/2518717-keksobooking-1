import { getData } from './api.js';
import { disableFilter, disableForm } from './control-form.js';
import { initForm } from './form.js';
import { initImageUploadAppartment, initImageUploadAvatar } from './load-images.js';
import { showMessage } from './maker-massage-success-error.js';
import { initMap, renderData } from './map.js';
import { createUiSlider } from './no-ui-slider.js';

disableForm();
disableFilter();

export const initApp = async () => {
  try {
    const isMapLoad = await initMap();
    if (isMapLoad) {
      disableForm(false);
      disableFilter(false);
      initForm();
      createUiSlider();
      initImageUploadAvatar();
      initImageUploadAppartment();
      const data = await getData();
      renderData(data);
    }
  } catch {
    showMessage('Не загружаются данные!');
  }
};
