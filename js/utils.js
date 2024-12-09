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

export {getRandomInteger, createRandomId, getRandomArrayElement};
