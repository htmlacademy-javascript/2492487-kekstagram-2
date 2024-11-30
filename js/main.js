const DESCRIPTIONS = [
  'Морской закат',
  'Розовый фламинго',
  'Гуси-лебеди',
  'Новогодняя Ель',
  'Вершина Эвереста',
  'Подарок на ДР',
  'Зеленая кастрюля',
  'Восход в горах',
  'Моя лучшая картина по номерам',
  'Скромный ужин холостяка',
  'Вечеринка в Лас-Вегасе',
  'Митинг на красной площади',
  'Аврора, которую угнал Ленин',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Королева Виктория',
  'Григорий Лепс',
  'Евгений Плющенко',
  'Рэй Брэдбери',
  'Гарри Поттер',
  'Джон Сноу',
  'Королева Драконов',
  'Фея Крестная',
  'Мистер Мускул',
  'Малефисента',
  'Сиси Кейдж',
  'Варвара Пивоварова',
  'Толик Алкоголик',
  'Василиса Премудрая',
  'Иван Дурак',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

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


const createComment = () => {
  return {
    id: generateCommentId(),
    avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
    message: generateMessagesArray(getRandomInteger(1, 2)).join(' '),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhoto = () => {
  return {
    id: generatePhotoId(),
    url: 'photos/' + generateUrlId() + '.jpg',
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length:getRandomInteger(0, 30)}, createComment),
  };
};

const photoNumbers = 25;

const photosStock = Array.from({length: photoNumbers}, createPhoto);

console.log(photosStock);
