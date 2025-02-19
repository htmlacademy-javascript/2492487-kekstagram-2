import { Filters, RANDOM_PHOTOS_COUNT } from './constants.js';
import { renderCards } from './renderPhotos.js';
import { debounce } from './utils.js';

const form = document.querySelector('.img-filters__form');
const filtersList = document.querySelector('.img-filters');

let localPhotos;
let currentFilter = Filters.DEFAULT;

const debouncedRender = debounce(renderCards);

const getFilteredData = {
  [Filters.DEFAULT]: () => localPhotos,
  [Filters.DISCUSSED]: () => [...localPhotos].sort((b, a) => a.comments.length - b.comments.length),
  [Filters.RANDOM]: () => [...localPhotos].sort(() => Math.random() - 0.5).slice(0, RANDOM_PHOTOS_COUNT)
};

const setActiveButton = (button) => {
  if (button.id === currentFilter) {
    return;
  }
  currentFilter = button.id;
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  button.classList.add('img-filters__button--active');

  debouncedRender(getFilteredData[currentFilter]());
};

form.addEventListener('click', ({ target }) => {
  if (target.classList.contains('img-filters__button')) {
    setActiveButton(target);
  }
});

export const showFilters = (photos) => {
  filtersList.classList.remove('img-filters--inactive');
  localPhotos = [...photos];
};
