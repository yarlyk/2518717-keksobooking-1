import {renderPopup} from './generate-markup.js';
import { generateRooms } from './data.js';
import { disableForm, disableFiltr, enableFiltr } from './control-form.js';
import { validatingFormSubmit } from './validate-form.js';
import { initMap } from './map.js';

disableForm();

validatingFormSubmit();

const estateObjects = generateRooms(1);
renderPopup (estateObjects[0]);

initMap();

disableFiltr();
enableFiltr();

export { estateObjects };
