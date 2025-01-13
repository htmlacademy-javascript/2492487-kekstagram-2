import { isEscapeKey, isEnterKey } from './utils';

const body = document.querySelector('body');
const photos = document.querySelector('.pictures');
const photoModalElement = document.querySelector('.big-picture');
const photoModalCloseElement = photoModalElement.querySelector('.big-picture__cancel');
const imageElement = photoModalElement.querySelector('.big-picture__img img');
const likesElement = photoModalElement.querySelector('.likes-count');
const descriptionElement = photoModalElement.querySelector('.social__caption');
const commentsCountElement = photoModalElement.querySelector('.social__comment-count');
const commentsShownElement = commentsCountElement.querySelector('.social__comment-shown-count');
const commentsTotalElement = commentsCountElement.querySelector('.social__comment-total-count');
const commentsList = photoModalElement.querySelector('.social__comments');
const commentsLoader = photoModalElement.querySelector('.social__comments-loader');
const commentTemplate = commentsList.querySelector('.social__comment');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoModal();
  }
};

const showModal = () => {
  photoModalElement.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

const renderComments = (photo) => {
  commentsList.innerHTML = '';
  const commentsListFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    commentImgElement.src = comment.avatar;
    commentImgElement.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
  commentsList.appendChild(commentsListFragment);

  if (commentsList.children.length > 5) {
    for (let i = 5; i < commentsList.children.length; i++) {
      commentsList.children[i].classList.add('hidden');
    }
    commentsShownElement.textContent = '5';
  }

  commentsLoader.addEventListener('click', () => {
    for (let i = Number(commentsShownElement.textContent); i < Number(commentsShownElement.textContent) + 5; i++) {
      commentsList.children[i].classList.remove('hidden');
    }
    commentsShownElement.textContent = String(Number(commentsShownElement.textContent) + 5);
  });

  // photoModalElement.querySelector('.social__comment-shown-count').textContent = pictureCommentsShown;

  //   const commentsList = photoModalElement.querySelector('.social__comments');
  //   for (let i = commentsList.children.length - 1; i >= 0; i--) {
  //     const child = commentsList.children[i];
  //     child.parentElement.removeChild(child);
  //   }



  // photoModalElement.querySelector('.social__comment-count').classList.add('hidden');
  // photoModalElement.querySelector('.social__comments-loader').classList.add('hidden');
};

const renderModal = (photo) => {
  imageElement.src = photo.url;
  imageElement.alt = photo.description;
  descriptionElement.textContent = photo.description;
  likesElement.textContent = photo.likes;
  commentsShownElement.textContent = photo.comments.length;
  commentsTotalElement.textContent = photo.comments.length;

  renderComments(photo);
};


export const openPhotoModal = (data) => {
  showModal();
  renderModal(data);
};

const closePhotoModal = () => {
  photoModalElement.classList.add('hidden');

  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
};

photoModalCloseElement.addEventListener('click', () => {
  closePhotoModal();
});
