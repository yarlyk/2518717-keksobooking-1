import { sendAd } from './api.js';
import { blockSubmitButton, resetAll } from './control-form.js';
import { showMessage } from './maker-massage-success-error.js';
import { formAd, isValid } from './validate-form.js';

export const initForm = () => {
  formAd.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      try {
        await sendAd(new FormData(formAd));
        resetAll();
        showMessage('Ваше объявление успешно размещено!');
      } catch {
        showMessage('Ошибка размещения объявления');
      } finally {
        blockSubmitButton(false);
      }
    }
  });
};
