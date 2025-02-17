import { openPhotoModal } from './renderModalPhoto.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

let localData;

const clearPhotos = () => {
  const currentPhotos = document.querySelectorAll('.picture');
  if (currentPhotos) {
    currentPhotos.forEach((element) => element.remove());
  }
};

export const renderCards = (photos) => {
  localData = [...photos];
  clearPhotos();
  const pictureListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');
    pictureImg.src = photo.url;
    pictureImg.alt = photo.description;
    pictureElement.dataset.photoId = photo.id;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureListFragment.appendChild(pictureElement);
  });
  pictureContainer.appendChild(pictureListFragment);
};

pictureContainer.addEventListener('click', (evt) => {
  const photoElement = evt.target.closest('.picture');
  if (photoElement) {
    const id = Number(photoElement.dataset.photoId);
    const photoData = localData.find((item) => item.id === id);
    openPhotoModal(photoData);
  }
});
