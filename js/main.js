import {renderPopup} from './generate-markup.js';
import { generateRooms } from './data.js';
import { disableForm, enableForm, disableFiltr, enableFiltr } from './control-form.js';

const estateObjects = generateRooms(1);
renderPopup (estateObjects[0]);

disableForm();
enableForm();

disableFiltr();
enableFiltr();
