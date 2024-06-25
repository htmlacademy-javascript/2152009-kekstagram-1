
import { similarPhoto } from './data.js';

const usersPhotoContainer = document.querySelector('.pictures');
const photoTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const similarPhotoUsers = similarPhoto;
const usersPhotoListFragment = document.createDocumentFragment();

export const renderPhotoUsers = () => {
  similarPhotoUsers.forEach(({ url,comments,likes,id }) => {

    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').innerHTML = likes;
    photoElement.querySelector('.picture__comments').innerHTML = comments.length;
    photoElement.setAttribute('id',`${id}`);
    usersPhotoListFragment.appendChild(photoElement);
  });

  usersPhotoContainer.appendChild(usersPhotoListFragment);
};

