import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import './photoUploader.js';
import { renderCards } from './renderPhotos.js';
import { getData } from './serverData.js';
import { showAlert } from './utils.js';

getData()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showAlert();
  }
  );
