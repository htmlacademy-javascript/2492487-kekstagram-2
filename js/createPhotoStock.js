import {getRandomInteger, createRandomId, getRandomArrayElement} from './utils.js';
import {DESCRIPTIONS, MESSAGES, NAMES, PHOTO_NUMBERS} from './data.js';

const generatePhotoId = createRandomId(1, 25);

const generateUrlId = createRandomId(1, 25);

const generateCommentId = createRandomId(1, 10000);

const generateMessagesArray = (messagesNumber) => {
  const messageArray = [];
  for (let i = 1; i <= messagesNumber; i++) {
    let messageString = getRandomArrayElement(MESSAGES);
    while (messageArray.includes(messageString)) {
      messageString = getRandomArrayElement(MESSAGES);
    }
    messageArray.push(messageString);
  }
  return messageArray;
};

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: generateMessagesArray(getRandomInteger(1, 2)).join(' '),
  name: getRandomArrayElement(NAMES),
});

const createPhoto = () => ({
  id: generatePhotoId(),
  url: `photos/${generateUrlId()}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length:getRandomInteger(0, 30)}, createComment),
});

const photosStock = (count) => Array.from({length: count}, createPhoto);

export {photosStock};
