import { PHOTO_TYPES } from './constants.js';

const photoUploaderForm = document.querySelector('.img-upload__form');
const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoPreviewer = photoUploaderForm.querySelector('.img-upload__preview');
const effectContainer = photoUploaderForm.querySelector('.effects');
const effectsPreviewList = effectContainer.querySelectorAll('.effects__preview');

export const getFile = () => {
  const file = photoUploaderInput.files[0];
  const fileName = file.name.toLowerCase();
  const isMatched = PHOTO_TYPES.some((type) => fileName.endsWith(type));
  if (isMatched) {
    const fileUrl = URL.createObjectURL(file);
    photoPreviewer.children[0].src = fileUrl;
    effectsPreviewList.forEach((element) => {
      element.style.backgroundImage = `url("${fileUrl}")`;
    });
  }
};
