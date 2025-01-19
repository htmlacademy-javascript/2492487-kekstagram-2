import { isEscapeKey} from './utils';

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

let localComments;
let renderedCommets = 0;

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

const renderStatistic = () => {
  commentsShownElement.textContent = renderedCommets;
};

const renderLoader = () => {
  if (localComments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
};

const renderComments = () => {
  const commentsListFragment = document.createDocumentFragment();
  localComments.splice(0, 5).forEach((comment) => {
    const commentElement = commentTemplate.cloneNode(true);
    const commentImgElement = commentElement.querySelector('.social__picture');
    commentImgElement.src = comment.avatar;
    commentImgElement.alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);

    renderedCommets++;
  });
  commentsList.appendChild(commentsListFragment);
  renderStatistic();
  renderLoader();
};

commentsLoader.addEventListener('click', () => {
  renderComments();
});

const renderModal = (photo) => {
  localComments = [...photo.comments];
  renderedCommets = 0;
  commentsList.innerHTML = '';
  imageElement.src = photo.url;
  imageElement.alt = photo.description;
  descriptionElement.textContent = photo.description;
  likesElement.textContent = photo.likes;

  commentsTotalElement.textContent = photo.comments.length;

  renderComments();
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
