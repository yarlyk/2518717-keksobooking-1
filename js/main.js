import {renderPopup} from './generate-markup.js';
import { generateRooms } from './data.js';
import { disableForm, disableFiltr, enableFiltr } from './control-form.js';
import './validate-form.js';
import { initMap } from './map.js';

disableForm();

initMap();

const estateObjects = generateRooms(1);
renderPopup (estateObjects[0]);

disableFiltr();
enableFiltr();
