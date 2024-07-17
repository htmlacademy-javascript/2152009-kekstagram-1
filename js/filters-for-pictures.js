import { renderPhotoUsers } from './rendering-thumbnails.js';
import { debounce } from './util.js';
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;
const FILTER_BUTTONS = [
  defaultFilterButton,
  randomFilterButton,
  discussedFilterButton,
];

let receivedPicturesData;
const getRandomInteger = () => {
  const lower = Math.ceil(Math.min(0, receivedPicturesData.length - 1));
  const upper = Math.floor(Math.max(0, receivedPicturesData.length - 1));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomUniquePictures = (picturesData, count) => {
  const uniquePictures = new Set();

  while (
    uniquePictures.size < count &&
    uniquePictures.size < picturesData.length
  ) {
    const randomIndex = getRandomInteger(0, picturesData.length - 1);
    uniquePictures.add(picturesData[randomIndex]);
  }

  return Array.from(uniquePictures);
};
const setActiveFilter = (newActiveButton) => {
  FILTER_BUTTONS.forEach((elem) =>
    elem.classList.remove('img-filters__button--active')
  );
  newActiveButton.classList.add('img-filters__button--active');
};
const clearPictures = ()=>{
  picturesContainer.querySelectorAll('a').forEach((elem) => elem.remove());
};

const applyRandomPictureFilter = (data) => {
  clearPictures();
  const randomPictures = getRandomUniquePictures(data, PICTURE_COUNT);
  renderPhotoUsers(randomPictures);
};
const applyDiscussedPictureFilter = (data) => {
  clearPictures();
  const discussedPictures = [...data].sort(
    (picture1, picture2) => picture2.comments.length - picture1.comments.length
  );
  renderPhotoUsers(discussedPictures);
};
const applyDefaultPictureFilter = () => {
  clearPictures();
  renderPhotoUsers(receivedPicturesData);
};

const applyDefaultFilterDebounced = debounce(() => {
  applyDefaultPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);

const applyRandomFilterDebounced = debounce(() => {
  applyRandomPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);

const applyDiscussedFilterDebounced = debounce(() => {
  applyDiscussedPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);
export const initPictures = (data) => {
  receivedPicturesData = data;
  applyDefaultPictureFilter();
};
defaultFilterButton.addEventListener('click', () => {
  setActiveFilter(defaultFilterButton);
  applyDefaultFilterDebounced();
});
randomFilterButton.addEventListener('click', () => {
  setActiveFilter(randomFilterButton);
  applyRandomFilterDebounced();
});
discussedFilterButton.addEventListener('click', () => {
  setActiveFilter(discussedFilterButton);
  applyDiscussedFilterDebounced();
});

