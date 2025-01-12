import { getRandomInteger, isEscapeKey, isEnterKey } from './utils';

const photos = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

function openPhotoModal(evt) {
  if (evt.target.nodeName === 'IMG' || evt.target.nodeName === 'A') {
    photoModalElement.classList.remove('hidden');

    document.querySelector('body').classList.add('modal-open');
    const pictureElement = evt.target.parentElement;

    photoModalElement.querySelector('.big-picture__img').children[0].src = pictureElement.querySelector('.picture__img').src;
    photoModalElement.querySelector('.social__caption').textContent = pictureElement.querySelector('.picture__img').alt;
    photoModalElement.querySelector('.likes-count').textContent = pictureElement.querySelector('.picture__likes').textContent;

    const pictureCommentsCount = pictureElement.querySelector('.picture__comments').textContent;
    photoModalElement.querySelector('.social__comment-total-count').textContent = pictureCommentsCount;
    const pictureCommentsShown = getRandomInteger(1, pictureCommentsCount);
    photoModalElement.querySelector('.social__comment-shown-count').textContent = pictureCommentsShown;

    const commentsList = photoModalElement.querySelector('.social__comments');
    for (let i = commentsList.children.length - 1; i >= 0; i--) {
      const child = commentsList.children[i];
      child.parentElement.removeChild(child);
    }

    for (let i = 0; i < pictureCommentsShown; i++) {
      const commentTemplate = document.createElement('li');
      commentTemplate.classList.add('social__comment');
      commentTemplate.innerHTML = '<img class="social__picture" src="{{аватар}}" alt="{{имя комментатора}}" width="35" height="35"><p class="social__text">{{текст комментария}}</p>';

      commentsList.appendChild(commentTemplate);
    }

    // photoModalElement.querySelector('.social__comment-count').classList.add('hidden');
    // photoModalElement.querySelector('.social__comments-loader').classList.add('hidden');

    document.addEventListener('keydown', onDocumentKeydown);
  }
}

function closePhotoModal() {
  photoModalElement.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

photos.addEventListener('click', openPhotoModal);

photos.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openPhotoModal();
  }
});

photoModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});
