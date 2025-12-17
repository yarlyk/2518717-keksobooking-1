import { sendAd } from "./api.js";
import { blockSubmitButton } from "./control-form.js";
import { createUiSlider } from "./no-ui-slider.js";
import { isValid } from "./validate-form.js";

const validatingForm = document.querySelector('.ad-form');

export const initForm = () => {
  validatingForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    if (isValid()) {
      blockSubmitButton();
      try {
        await sendAd(new FormData(validatingForm));
        // resetForm();
        // showPopup(SUCCESS)
        console.log('!!!!!')
      } catch {
        // showPopup(ERROR)
        console.log('error??????')
      } finally {
        blockSubmitButton(false);
      }

    }
  });
};

createUiSlider();