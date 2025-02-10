import { renderCards } from './renderPhotos.js';
import { getRandomArrayElement } from './utils.js';

const filtersList = document.querySelector('.img-filters');
const defaultFilter = filtersList.querySelector('#filter-default');
const randomFilter = filtersList.querySelector('#filter-random');
const discussedFilter = filtersList.querySelector('#filter-discussed');

export const showFilters = () => filtersList.classList.remove('img-filters--inactive');

export const showRandomPhotos = (photos, number) => {
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

export const showDiscussedPhotos = (photos) => {
  const localArray = [...photos];
  const sortedPhotos = localArray.sort(compareCommentCount);
  renderCards(sortedPhotos);
};

export const setRandomFilter = (cb) => {
  randomFilter.addEventListener('click', () => {
    filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    randomFilter.classList.add('img-filters__button--active');
    cb();
  });
};

export const setDiscussedFilter = (cb) => {
  discussedFilter.addEventListener('click', () => {
    filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    discussedFilter.classList.add('img-filters__button--active');
    cb();
  });
};

export const setDefaultFilter = (cb) => {
  defaultFilter.addEventListener('click', () => {
    filtersList.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    defaultFilter.classList.add('img-filters__button--active');
    cb();
  });
};
