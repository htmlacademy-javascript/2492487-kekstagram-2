import { EFFECTS, EFFECTS_SETTINGS } from './constants.js';

const photoUploaderForm = document.querySelector('.img-upload__form');
const effectSlider = photoUploaderForm.querySelector('.effect-level__slider');
const sliderContainer = photoUploaderForm.querySelector('.img-upload__effect-level');
const effectContainer = photoUploaderForm.querySelector('.effects');
const effectLevelValue = photoUploaderForm.querySelector('.effect-level__value');
const photoPreview = photoUploaderForm.querySelector('.img-upload__preview img');

let currentEffect = EFFECTS.NONE;

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const render = () => {
  const { style, units } = EFFECTS_SETTINGS[currentEffect];
  photoPreview.style.filter = `${style}(${effectLevelValue.value}${units})`;
}

effectSlider.noUiSlider.on('update', () => {
  effectLevelValue.value = effectSlider.noUiSlider.get();
  render();
})

const updateSlider = () => {
  const { min, max, step } = EFFECTS_SETTINGS[currentEffect];
  effectSlider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });
}

effectContainer.addEventListener('change', ({ target }) => {
  currentEffect = target.value;
  if (target.value === EFFECTS.NONE) {
    reset();
  } else {
    updateSlider();
    sliderContainer.classList.remove('hidden');
  }
});

export function reset() {
  currentEffect = EFFECTS.NONE;
  updateSlider();
  document.querySelector(`.effects__radio[value=${EFFECTS.NONE}]`).checked = true;
  sliderContainer.classList.add('hidden');
  photoPreview.style.filter = '';
}

reset();
