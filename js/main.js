import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import { renderCards } from './renderPhotos.js';


const pictures = createPhotosStock(PHOTOS_COUNT);
renderCards(pictures);

