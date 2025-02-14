import { isValid } from './validation.js';
import { reset as resetValidation } from './validation.js';
import { reset as resetScale } from './scale.js';
import { reset as resetEffects } from './effects.js';
import { sendData } from './serverData.js';
import { showPopup } from './popup.js';
import { removeEscapeControl, setEscapeControl } from './escapeControl.js';
import { getFile } from './getFile.js';
import { Popups, SubmitButtonText } from './constants.js';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');
const formFields = photoUploaderForm.querySelector('.img-upload__text');
const hashtagsInput = formFields.querySelector('.text__hashtags');
const commentInput = formFields.querySelector('.text__description');
const submitButton = photoUploaderForm.querySelector('.img-upload__submit');

const closeUploader = () => {
  photoEditForm.classList.add('hidden');
  body.classList.remove('modal-open');
  photoUploaderForm.reset();
  resetValidation();
  resetScale();
  resetEffects();
};

const closeFormFlag = () => !(document.activeElement === hashtagsInput || document.activeElement === commentInput);

const openUploader = () => {
  photoEditForm.classList.remove('hidden');
  body.classList.add('modal-open');
  setEscapeControl(closeUploader, closeFormFlag);
};

photoUploaderInput.addEventListener('change', () => {
  getFile();
  openUploader();
});

cancelUploaderButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploader();
  removeEscapeControl();
});

const blockSubmitButton = (isBlocked = true) => {
  submitButton.disabled = isBlocked;
  submitButton.textContent = isBlocked ? SubmitButtonText.SENDING : SubmitButtonText.IDLE;
};

photoUploaderForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (isValid()) {
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploader();
        removeEscapeControl();
        showPopup(Popups.SUCCESS);
      })
      .catch(() => {
        showPopup(Popups.ERROR);
      })
      .finally(() => {
        blockSubmitButton(false);
      });
  }
});
