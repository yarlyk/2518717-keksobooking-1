import {renderPopup} from './generate-markup.js';
import { generateRooms } from './data.js';
import { disableElement, ableElement } from './disable-form.js';

const estateObjects = generateRooms(1);
renderPopup (estateObjects[0]);

disableElement('.ad-form', 'fieldset');
disableElement('.map__filters', 'select');
disableElement('.map__filters', 'fieldset');
ableElement('.ad-form', 'fieldset');
ableElement('.map__filters', 'select');
ableElement('.map__filters', 'fieldset');
