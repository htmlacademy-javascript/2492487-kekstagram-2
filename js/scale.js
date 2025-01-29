import { MAX_SCALE, MIN_SCALE, SCALE_STEP, SCALE_FACTOR } from './constants.js';
const photoUploaderForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = photoUploaderForm.querySelector('.scale__control--smaller');
const scaleControlBigger = photoUploaderForm.querySelector('.scale__control--bigger');
const scaleControlValue = photoUploaderForm.querySelector('.scale__control--value');
const photoPreview = photoUploaderForm.querySelector('.img-upload__preview img');

let currentScale = MAX_SCALE;

const render = () => {
  scaleControlValue.value = `${currentScale}%`;
  photoPreview.style.transform = `scale(${currentScale * SCALE_FACTOR})`;
};

const onBiggerClick = () => {
  currentScale = Math.min(currentScale + SCALE_STEP, MAX_SCALE);
  render()
};

const onSmallerClick = () => {
  currentScale = Math.max(currentScale - SCALE_STEP, MIN_SCALE);
  render();
}

scaleControlBigger.addEventListener('click', onBiggerClick);

scaleControlSmaller.addEventListener('click', onSmallerClick);

export const reset = () => {
  currentScale = MAX_SCALE;
  render();
};

reset();
