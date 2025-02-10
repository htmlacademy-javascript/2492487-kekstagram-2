import { PHOTOS_COUNT, DEFAULT_TIMEOUT_DELAY, RANDOM_PHOTOS_COUNT } from './constants.js';
import { createPhotosStock } from './createPhotoStock.js';
import { showFilters, setRandomFilter, setDiscussedFilter, setDefaultFilter, showRandomPhotos, showDiscussedPhotos } from './filters.js';
import './photoUploader.js';
import { renderCards } from './renderPhotos.js';
import { getData } from './serverData.js';
import { showAlert, debounce } from './utils.js';

getData()
  .then((photos) => {
    renderCards(photos);
    showFilters();
    setRandomFilter(debounce(
      () => showRandomPhotos(photos, RANDOM_PHOTOS_COUNT), DEFAULT_TIMEOUT_DELAY,
    ));
    setDiscussedFilter(debounce(
      () => showDiscussedPhotos(photos), DEFAULT_TIMEOUT_DELAY,
    ));
    setDefaultFilter(debounce(
      () => renderCards(photos), DEFAULT_TIMEOUT_DELAY,
    ));
  })
  .catch(() => {
    showAlert();
  }
  );
