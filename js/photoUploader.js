import { isEscapeKey, showAlert } from './utils.js';
import { isValid } from './validation.js';
import { reset as resetValidation } from './validation.js';
import { reset as resetScale } from './scale.js';
import { reset as resetEffects } from './effects.js';
import { sendData } from './serverData.js';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
export const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');
const formFields = photoUploaderForm.querySelector('.img-upload__text');
const hashtagsInput = formFields.querySelector('.text__hashtags');
const commentInput = formFields.querySelector('.text__description');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploader();
  }
};

export const openUploader = () => {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploader = () => {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploaderForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
};

photoUploaderInput.addEventListener('change', () => {
  openUploader();
});

cancelUploaderButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploader();
});

export const submitUploaderForm = (onSuccess) => {
  photoUploaderForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!isValid) {
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(() => {
          showAlert();
        });
    }
  });
};

hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
