import { sendAd } from './api.js';
import { POPUPS } from './constants.js';
import { blockSubmitButton, resetAll } from './control-form.js';
import { showPopup} from './popup-message-maker.js';
import { formAd, isValid } from './validate-form.js';

export const initForm = () => {
  formAd.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      try {
        await sendAd(new FormData(formAd));
        resetAll();
        showPopup(POPUPS.SUCCESS);
      } catch {
        showPopup(POPUPS.ERROR);
      } finally {
        blockSubmitButton(false);
      }
    }
  });
};
