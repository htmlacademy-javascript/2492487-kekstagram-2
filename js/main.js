import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import { renderCards } from './renderPhotos.js';
import './renderModalPhoto.js';

const pictures = createPhotosStock(PHOTOS_COUNT);
renderCards(pictures);

