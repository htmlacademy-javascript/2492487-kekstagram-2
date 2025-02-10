import { removeEscapeControl, setEscapeControl } from './escapeControl.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const templates = {
  success: successTemplate,
  error: errorTemplate,
};

export const showPopup = (type) => {
  const formMessage = templates[type].cloneNode(true);
  document.body.append(formMessage);
  setEscapeControl(() => {
    formMessage.remove();
  });
  formMessage.addEventListener('click', ({ target }) => {
    if (target.classList.contains(type) || target.classList.contains(`${type}__button`)) {
      formMessage.remove();
      removeEscapeControl();
    }
  });
};
