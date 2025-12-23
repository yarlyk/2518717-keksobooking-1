import { sendAd } from './api.js';
import { blockSubmitButton, resetAll } from './control-form.js';
import { showErrorMessage, showSuccessMessage } from './maker-massage-success-error.js';
import { formAd, isValid } from './validate-form.js';
/**
 * Инициализирует форму после валидации и отправки данных
 */
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
