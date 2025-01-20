import { isEscapeKey} from './utils';

const body = document.querySelector('body');
const photoUploaderForm = body.querySelector('.img-upload__form');
export const photoUploaderInput = photoUploaderForm.querySelector('.img-upload__input');
const photoEditForm = photoUploaderForm.querySelector('.img-upload__overlay');
const cancelUploaderButton = photoUploaderForm.querySelector('.img-upload__cancel');
const submitUploaderButton = photoUploaderForm.querySelector('.img-upload__submit');

const formFields = photoUploaderForm.querySelector('.img-upload__text');
const hashtagsInput = formFields.querySelector('.text__hashtags');
const commentInput = formFields.querySelector('.text__description');

const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;

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
  photoUploaderInput.value = '';
  hashtagsInput.value = '';
  commentInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

cancelUploaderButton.addEventListener('click', ()=>{
  closeUploader();
});


const pristine = new Pristine(photoUploaderForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

const validateHashtags = (value) => {
  if(value === '') {
    return true;
  }
  const hashtags = value.split(' ');
  return hashtags.every((element) => validHashtag.test(element));
};

const validateHashtagsNumber = (value) => {
  const hashtags = value.split(' ');
  return hashtags.length <= 5;
};

const validateHashtagsRepeat = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const unrepeatedHashtags = Array.from(new Set(hashtags));
  return hashtags.length === unrepeatedHashtags.length;
};

const validateComment = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtags, 'введён невалидный хэштег');
pristine.addValidator(hashtagsInput, validateHashtagsNumber, 'превышено количество хэштегов');
pristine.addValidator(hashtagsInput, validateHashtagsRepeat, 'хэштеги повторяются');
pristine.addValidator(commentInput, validateComment, 'длина комментария больше 140 символов');

photoUploaderForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    console.log('Можно отправлять');
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
