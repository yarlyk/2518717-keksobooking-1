import { sendAd } from './api.js';
import { blockSubmitButton, resetAll } from './control-form.js';
import { showErrorMessage, showSuccessMessage } from './maker-massage-success-error.js';
import { formAd, isValid } from './validate-form.js';

export const initForm = () => {
  formAd.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      try {
        await sendAd(new FormData(formAd));
        resetAll();
        showSuccessMessage();
      } catch {
        showErrorMessage();
      } finally {
        blockSubmitButton(false);
      }
    }
  });
};
