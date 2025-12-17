import { getData } from './api.js';
import { disableFilter, disableForm, enableForm } from './control-form.js';
import { initForm } from './form.js';
import { initMap, renderData } from './map.js';

disableForm();
disableFilter();

export const initApp = async () => {
  try {
    const isMapLoad = await initMap();
    if (isMapLoad) {
      enableForm();
      initForm();
      const data = await getData();
      renderData(data);
    }

  } catch {

  }
};