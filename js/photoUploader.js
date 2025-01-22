import { MAX_SCALE, MIN_SCALE, SCALE_STEP } from './constants.js';
import { isEscapeKey} from './utils.js';
import { isValid } from './validation.js';
import { reset as resetValidation } from './validation.js';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
export const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');

const scaleControlSmaller = photoUploaderForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoUploaderForm.querySelector('.scale__control--bigger');
const scaleControlValue = photoUploaderForm.querySelector('.scale__control--value');
const photoPreview = photoUploaderForm.querySelector('.img-upload__preview');
const sliderContainer = photoUploaderForm.querySelector('.img-upload__effect-level');
const effectSlider = photoUploaderForm.querySelector('.effect-level__slider');
const effectLevelValue = photoUploaderForm.querySelector('.effect-level__value');
const effectNone = photoUploaderForm.querySelector('#effect-none');
const effectChrome = photoUploaderForm.querySelector('#effect-chrome');
const effectSepia = photoUploaderForm.querySelector('#effect-sepia');
const effectMarvin = photoUploaderForm.querySelector('#effect-marvin');
const effectPhobos = photoUploaderForm.querySelector('#effect-phobos');
const effectHeat = photoUploaderForm.querySelector('#effect-heat');

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
  photoPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
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

// Слайдер

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const defaultSliderSet = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
};

const marvinSliderSet = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
};

const phobosSliderSet = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

const heatSliderSet = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
};

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  if(effectChrome.checked) {
    photoPreview.style.filter = `grayscale(${effectLevelValue.value})`;
  }
  if(effectSepia.checked) {
    photoPreview.style.filter = `sepia(${effectLevelValue.value})`;
  }
  if(effectMarvin.checked) {
    photoPreview.style.filter = `invert(${effectLevelValue.value}%)`;
  }
  if(effectPhobos.checked) {
    photoPreview.style.filter = `blur(${effectLevelValue.value}px)`;
  }
  if(effectHeat.checked) {
    photoPreview.style.filter = `brightness(${effectLevelValue.value})`;
  }
});

sliderContainer.classList.add('hidden');

effectNone.addEventListener('change', (evt) => {
  if(evt.target.checked) {
    photoPreview.style.removeProperty('filter');
    sliderContainer.classList.add('hidden');
  }
});

effectChrome.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  if(evt.target.checked) {
    effectSlider.noUiSlider.updateOptions(defaultSliderSet);
  }
});

effectSepia.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  if(evt.target.checked) {
    effectSlider.noUiSlider.updateOptions(defaultSliderSet);
  }
});

effectMarvin.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  if(evt.target.checked) {
    effectSlider.noUiSlider.updateOptions(marvinSliderSet);
  }
});

effectPhobos.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  if(evt.target.checked) {
    effectSlider.noUiSlider.updateOptions(phobosSliderSet);
  }
});

effectHeat.addEventListener('change', (evt) => {
  sliderContainer.classList.remove('hidden');
  if(evt.target.checked) {
    effectSlider.noUiSlider.updateOptions(heatSliderSet);
  }
});
