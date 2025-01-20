import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from './constants.js';
import { isEscapeKey} from './utils.js';
import { isValid } from './validation.js';
import { reset as resetValidation } from './validation.js';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
export const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');
const submitUploaderButton = photoUploaderForm.querySelector('.img-upload__submit');

const scaleControlSmaller = photoUploaderForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoUploaderForm.querySelector('.scale__control--bigger');
const scaleControlValue = photoUploaderForm.querySelector('.scale__control--value');
const photoPreview = photoUploaderForm.querySelector('.img-upload__preview');

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
  photoPreview.style.transform = 'scale(1)';
  document.removeEventListener('keydown', onDocumentKeydown);
};

photoUploaderInput.addEventListener('change', ()=>{
  openUploader();
});

cancelUploaderButton.addEventListener('click', ()=>{
  closeUploader();
});

photoUploaderForm.addEventListener('submit', (evt)=>{
  //evt.preventDefault();
  if (!isValid) {
    evt.preventDefault();
  }
});

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

let scaleInNumber;

const editScaleSmaller = () => {
  scaleInNumber = parseInt(scaleControlValue.value, 10);
  if(scaleInNumber > MIN_SCALE) {
    scaleInNumber = scaleInNumber - SCALE_STEP;
    scaleControlValue.value = `${scaleInNumber}%`;
    photoPreview.style.transform = `scale(0.${scaleInNumber})`;
  }
};

scaleControlSmaller.addEventListener('click', ()=>{
  editScaleSmaller();
});

const editScaleBigger = () => {
  scaleInNumber = parseInt(scaleControlValue.value, 10);
  if(scaleInNumber < MAX_SCALE) {
    scaleInNumber = scaleInNumber + SCALE_STEP;
    scaleControlValue.value = `${scaleInNumber}%`;
    if(scaleInNumber === MAX_SCALE) {
      photoPreview.style.transform = 'scale(1)';
    } else {
      photoPreview.style.transform = `scale(0.${scaleInNumber})`;
    }
  }
};

scaleControlBigger.addEventListener('click', ()=>{
  editScaleBigger();
});
