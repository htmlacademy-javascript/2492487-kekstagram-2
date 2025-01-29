import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import './photoUploader.js';
import { renderCards } from './renderPhotos.js';
import { getData } from './serverData.js';
import { showAlert } from './utils.js';

const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');

getData()
  .then((photos) => {
    renderCards(photos);
  })
  .catch(() => {
    showAlert(dataErrorTemplate);
  }
  );
