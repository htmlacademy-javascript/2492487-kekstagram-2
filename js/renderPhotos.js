import { photosStock } from './createPhotoStock';

const pictureContainer = document.querySelector('.pictures');
// const pictureList = pictureContainer.children;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const pictureStock = photosStock(25);

const pictureListFragment = document.createDocumentFragment();

pictureStock.forEach((photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = photo.url;
  pictureImg.alt = photo.description;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureListFragment.appendChild(pictureElement);
});

pictureContainer.appendChild(pictureListFragment);
