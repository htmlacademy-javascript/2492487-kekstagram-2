import { ALERT_SHOW_TIME } from "./constants";

// функция получения рандомного числа из заданного диапазона
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// функция получения рандомного id без повторения
const createRandomId = (min, max) => {
  const previousIds = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    if (previousIds.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousIds.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }
    previousIds.push(currentId);
    return currentId;
  };
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';


export const showAlert = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorAlert = dataErrorTemplate.cloneNode(true);
  document.body.append(dataErrorAlert);
  setTimeout(() => {
    dataErrorAlert.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, createRandomId, getRandomArrayElement, isEscapeKey, isEnterKey};
