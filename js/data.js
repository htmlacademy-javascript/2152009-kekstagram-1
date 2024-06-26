import {getRandomInteger,createRandomIdFromRangeGenerator,getRandomArrayElement} from './util.js';
export const DESCRIPTIONS = [
  'Золотистые лучи солнца проникают сквозь густую листву деревьев, создавая игру света и тени в таинственном лесу.',
  'На фоне утреннего неба горделиво стоит одинокий маяк, озаренный первыми лучами восходящего солнца.',
  'Серебристые волны ласкают берег, оставляя на песке игривые узоры, словно послание приближающемуся приливу.',
  'Под небесной куполом сияют тысячи звезд, рисуя на холсте ночного неба великолепные узоры созвездий.',
  'Кристально чистая вода озера отражает яркие осенние краски леса, создавая захватывающий пейзаж утреннего тумана.',
  'Таинственный туманный лес скрывает свои тайны под покровом мистической дымки, призывая исследователей раскрыть его загадки.',
  'Пышное поле лаванды, простирающееся до горизонта, наполняет воздух нежным ароматом и предлагает умиротворяющий вид на закат.',
  'Блеск росы на паутине превращает обычные травы в изысканные произведения природного искусства, исполненные мерцающей красоты.',
  'В лучах вечернего солнца старый заброшенный маяк выглядит как памятник временам прошлым, полный загадок и тайн.',
  'Мощный водопад, окутанный облаком брызг и тумана, бросает вызов окружающей природе своей неукротимой силой и величием.'
];

export const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  ' Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const NAMES = [
  'Анна',
  'Максим',
  'Елизавета',
  'Дмитрий',
  'Ольга',
  'Артем',
  'Виктория',
  'Иван',
  'Людмила',
  'Алексей',
  'Наталья',
  'Александра',
  'Сергей',
  'Екатерина',
  'Павел'];
const SIMILAR_PHOTO_COUNT = 25;


const generatePhotoId = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_COUNT);
const generatePhotoUrl = createRandomIdFromRangeGenerator(1, SIMILAR_PHOTO_COUNT);

const createCommentObject = (generateCommentId) => {
  const avatarUrl = getRandomInteger(1, 6);

  return{
    id: generateCommentId(),
    avatar: `img/avatar-${avatarUrl}.svg`,
    message: `${getRandomArrayElement(MESSAGES)}`,
    name:`${getRandomArrayElement(NAMES)}`
  };
};

const createPhotoObject = () => {
  const likesOnPhotos = getRandomInteger(15, 200);
  const SIMILAR_COMMENTS_COUNT = getRandomInteger(1, 20);
  const generateCommentId = createRandomIdFromRangeGenerator(1, SIMILAR_COMMENTS_COUNT);
  const similarComments = Array.from({length: SIMILAR_COMMENTS_COUNT},()=> createCommentObject(generateCommentId));
  return {
    id: generatePhotoId(),
    url: `photos/${generatePhotoUrl()}.jpg`,
    description: `${getRandomArrayElement(DESCRIPTIONS)}`,
    likes:likesOnPhotos,
    comments:similarComments
  };
};

export const similarPhoto = Array.from({length: SIMILAR_PHOTO_COUNT}, createPhotoObject);

