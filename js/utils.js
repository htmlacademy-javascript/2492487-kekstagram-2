import { ALERT_SHOW_TIME, DEFAULT_TIMEOUT_DELAY } from './constants.js';

export const isEscapeKey = (evt) => evt.key === 'Escape';


export const showAlert = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorAlert = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorAlert);
  setTimeout(() => {
    dataErrorAlert.remove();
  }, ALERT_SHOW_TIME);
};

export const debounce = (callback, timeoutDelay = DEFAULT_TIMEOUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
