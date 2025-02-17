import { showFilters } from './filters.js';
import './photoUploader.js';
import { renderCards } from './renderPhotos.js';
import { getData } from './serverData.js';
import { showAlert } from './utils.js';

getData()
  .then((photos) => {
    renderCards(photos);
    showFilters(photos);
  })
  .catch(() => {
    showAlert();
  });
