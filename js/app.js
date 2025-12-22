import { getData } from './api.js';
import { disableFilter, disableForm } from './control-form.js';
import { initFilter } from './filter-sort.js';
import { initForm } from './form.js';
import { initImageUploadAppartment, initImageUploadAvatar } from './load-images.js';
import { showMessage } from './maker-massage-success-error.js';
import { initMap } from './map.js';
import { createUiSlider } from './no-ui-slider.js';

disableForm();
disableFilter();
export let strangerAds;

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
      strangerAds = await getData();
      // console.log(strangerAds);
      initFilter(strangerAds);
      // renderData(strangerAds.slice(0,10));
    }
  } catch {
    showMessage('Не загружаются данные!');
  }
};
