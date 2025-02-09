import { PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import { showFilters } from './filters.js';
import './photoUploader.js';
import { renderCards } from './renderPhotos.js';
import { getData } from './serverData.js';
import { showAlert } from './utils.js';

export let localData;

getData()
  .then((photos) => {
    localData = [...photos];
    renderCards(localData);
    showFilters();
  })
  .catch(() => {
    showAlert();
  }
  );
