import { isEscapeKey, isEnterKey } from './utils';

const photos = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function openPhotoModal (evt) {
  if (evt.target.nodeName === 'IMG' || evt.target.nodeName === 'A') {
    photoModalElement.classList.remove('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydown);
}

function closePhotoModal () {
  photoModalElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
}

photos.addEventListener('click', openPhotoModal);

photos.addEventListener('keydown', (evt) => {
  if(isEnterKey(evt)){
    openPhotoModal();
  }
});

photoModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});

