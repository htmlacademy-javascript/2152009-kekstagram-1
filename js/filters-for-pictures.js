import { renderPhotoUsers } from './rendering-thumbnails.js';
import { debounce } from './util.js';
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const PICTURE_COUNT = 10;
const RERENDER_DELAY = 500;
let receivedPicturesData;
const renderPictures = (pictures)=>{
  renderPhotoUsers(pictures);
};
const getRandomInteger = () => {
  const lower = Math.ceil(Math.min(0, receivedPicturesData.length - 1));
  const upper = Math.floor(Math.max(0, receivedPicturesData.length - 1));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomUniquePictures = (picturesData, count) => {
  const uniquePictures = new Set();

  while (uniquePictures.size < count && uniquePictures.size < picturesData.length) {
    const randomIndex = getRandomInteger(0, picturesData.length - 1);
    uniquePictures.add(picturesData[randomIndex]);
  }

  return Array.from(uniquePictures);
};
const initFilterButtons = ()=>{
  randomFilterButton.classList.remove('img-filters__button--active');
  discussedFilterButton.classList.remove('img-filters__button--active');
  defaultFilterButton.classList.remove('img-filters__button--active');
  picturesContainer.querySelectorAll('a').forEach((elem) => elem.remove());

};

const randomPictureFilter = (data)=>{
  const randomPictures = getRandomUniquePictures([...data], PICTURE_COUNT);
  renderPictures(randomPictures);

};
const discussedPictureFilter = (data)=>{
  const sorted = [...data].sort((picture1, picture2) => picture2.comments.length - picture1.comments.length);
  renderPictures(sorted);

};
export const defaultPictureFilter = (data)=>{
  receivedPicturesData = data;
  renderPictures(receivedPicturesData);
};


const debouncedDefaultFilter = debounce(() => {
  initFilterButtons();
  defaultFilterButton.classList.add('img-filters__button--active');
  defaultPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);

const debouncedRandomFilter = debounce(() => {
  initFilterButtons();
  randomFilterButton.classList.add('img-filters__button--active');
  randomPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);

const debouncedDiscussedFilter = debounce(() => {
  initFilterButtons();
  discussedFilterButton.classList.add('img-filters__button--active');
  discussedPictureFilter(receivedPicturesData);
}, RERENDER_DELAY);
defaultFilterButton.addEventListener('click', debouncedDefaultFilter);
randomFilterButton.addEventListener('click', debouncedRandomFilter);
discussedFilterButton.addEventListener('click', debouncedDiscussedFilter);
