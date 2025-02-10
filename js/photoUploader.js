import { isEscapeKey } from './utils.js';
import { isValid } from './validation.js';
import { reset as resetValidation } from './validation.js';
import { reset as resetScale } from './scale.js';
import { reset as resetEffects } from './effects.js';
import { sendData } from './serverData.js';
import { showPopup } from './popup.js';
import { removeEscapeControl, setEscapeControl } from './escapeControl.js';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
export const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');
const formFields = photoUploaderForm.querySelector('.img-upload__text');
const hashtagsInput = formFields.querySelector('.text__hashtags');
const commentInput = formFields.querySelector('.text__description');

const closeUploader = () => {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploaderForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

const closeFormFlag = () => !(document.activeElement === hashtagsInput || document.activeElement === commentInput);

export const openUploader = () => {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  setEscapeControl(closeUploader, closeFormFlag);
};

photoUploaderInput.addEventListener('change', () => {
  openUploader();
});

cancelUploaderButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploader();
  removeEscapeControl();
});

photoUploaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    sendData(new FormData(evt.target))
      .then(()=>{
        closeUploader();
        removeEscapeControl();
        showPopup('success');
      })
      .catch(() => {
        showPopup('error');
      });
  }
});
