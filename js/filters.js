import { DEFAULT_TIMEOUT_DELAY, RANDOM_PHOTOS_COUNT } from './constants.js';
import { localData } from './main.js';
import { renderCards } from './renderPhotos.js';
import { debounce, getRandomArrayElement } from './utils.js';

const filtersList = document.querySelector('.img-filters');
const defaultFilter = filtersList.querySelector('#filter-default');
const randomFilter = filtersList.querySelector('#filter-random');
const discussedFilter = filtersList.querySelector('#filter-discussed');

export const showFilters = () => filtersList.classList.remove('img-filters--inactive');

const showDefaultPhotos = (photos) => renderCards(photos);

const showRandomPhotos = (photos, number) => {
  const newPhotosArray = [];
  for (let i = 1; i <= number; i++) {
    let photo = getRandomArrayElement(photos);
    while (newPhotosArray.includes(photo)) {
      photo = getRandomArrayElement(photos);
    }
    newPhotosArray.push(photo);
  }
  renderCards(newPhotosArray);
};

const compareCommentCount = (photo1, photo2) => photo2.comments.length - photo1.comments.length;

const showDiscussedPhotos = (photos) => {
  const sortedPhotos = photos.sort(compareCommentCount);
  renderCards(sortedPhotos);
};

randomFilter.addEventListener('click', () => {
  filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  randomFilter.classList.add('img-filters__button--active');
  debounce(showRandomPhotos(localData, RANDOM_PHOTOS_COUNT), DEFAULT_TIMEOUT_DELAY,);
});

discussedFilter.addEventListener('click', () => {
  filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  discussedFilter.classList.add('img-filters__button--active');
  debounce(showDiscussedPhotos(localData), DEFAULT_TIMEOUT_DELAY);
});

defaultFilter.addEventListener('click', () => {
  filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  defaultFilter.classList.add('img-filters__button--active');
  debounce(showDefaultPhotos(localData), DEFAULT_TIMEOUT_DELAY);
});
