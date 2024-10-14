import {renderPopup} from './generate-markup.js';
import { generateRooms } from './data.js';

const estateObjects = generateRooms(1);
renderPopup (estateObjects[0]);
