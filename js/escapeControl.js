import { isEscapeKey } from './utils.js';

const popups = [];
let listener = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const lastIndex = popups.length - 1;
    if (popups[lastIndex].condition && !popups[lastIndex].condition()) {
      return;
    }
    popups[lastIndex].closeFn();
    popups.length = popups.length - 1;
    if (!popups.length) {
      listener = null;
      document.removeEventListener('keydown', onDocumentKeydown);
    }
  }
};

export const setEscapeControl = (closeFn, condition = null) => {
  popups.push({
    closeFn,
    condition
  });

  if (!listener) {
    listener = document.addEventListener('keydown', onDocumentKeydown);
  }
};

export const removeEscapeControl = () => {
  popups.length = popups.length - 1;
  if (!popups.length) {
    listener = null;
    document.removeEventListener('keydown', onDocumentKeydown);
  }
};
