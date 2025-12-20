import { sendAd } from './api.js';
import { blockSubmitButton, resetForm } from './control-form.js';
import { showMessage } from './maker-massage-success-error.js';
import { formAd, isValid } from './validate-form.js';

export const initForm = () => {
  formAd.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      try {
        await sendAd(new FormData(formAd));
        resetForm();
        showMessage('Ваше объявление успешно размещено!');
        // console.log('Всё ушло!!!');
      } catch {
        showMessage('Ошибка размещения объявления');
        // console.log('Не ушло...');
      } finally {
        blockSubmitButton(false);
      }
    }
  });
};
