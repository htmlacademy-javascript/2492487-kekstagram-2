import { MAX_COMMENT_LENGTH, MAX_HASHTAGS, SPACE, VALIDHASHTAG } from './constants.js';
const photoUploaderForm = document.querySelector('.img-upload__form');
const formFields = photoUploaderForm.querySelector('.img-upload__text');
const hashtagsInput = formFields.querySelector('.text__hashtags');
const commentInput = formFields.querySelector('.text__description');

const pristine = new Pristine(photoUploaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashTags = (value) => value.toLowerCase().replaceAll(SPACE, ' ').trim().split(' ');

const validateHashtags = (value) => {
  if(value === '') {
    return true;
  }
  const hashtags = getHashTags(value);
  return hashtags.every((element) => VALIDHASHTAG.test(element));
};

const validateHashtagsNumber = (value) => {
  const hashtags = getHashTags(value);
  return hashtags.length <= MAX_HASHTAGS;
};

const validateHashtagsRepeat = (value) => {
  const hashtags = getHashTags(value);
  const unrepeatedHashtags = Array.from(new Set(hashtags));
  return hashtags.length === unrepeatedHashtags.length;
};

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(
  hashtagsInput,
  validateHashtags,
  'введён невалидный хэштег'
);
pristine.addValidator(
  hashtagsInput,
  validateHashtagsNumber,
  `количество хэштегов не должно превышать ${MAX_HASHTAGS}`
);
pristine.addValidator(
  hashtagsInput,
  validateHashtagsRepeat,
  'хэштеги повторяются'
);
pristine.addValidator(
  commentInput,
  validateComment,
  `длина комментария больше ${MAX_COMMENT_LENGTH} символов`
);

export const isValid = () => pristine.validate();
export const reset = () => pristine.reset();
