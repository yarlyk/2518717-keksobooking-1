import { getData } from './api.js';
import { disableElement} from './control-form.js';
import { initFilter } from './filter-sort.js';
import { initForm } from './form.js';
import { initImageUploadAppartment, initImageUploadAvatar } from './load-images.js';
import { showMessage } from './popup-message-maker.js';
import { initMap } from './map.js';

const formAd = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');

disableElement(formAd);
disableElement(mapFilter);

export const initApp = async () => {
  try {
    const isMapLoad = await initMap();
    if (isMapLoad) {
      disableElement(formAd, false);
      initForm();
      initImageUploadAvatar();
      initImageUploadAppartment();

      const strangerAds = await getData();
      initFilter(strangerAds);
      disableElement(mapFilter, false);
    }
  } catch (e) {
    showMessage('Не загружаются данные!');
  }
};
