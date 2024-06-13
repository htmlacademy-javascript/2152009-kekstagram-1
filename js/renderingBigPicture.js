import { isEscapeKey } from './util.js';
import { similarPhoto } from './data.js';
import { initComments } from './commentsBigPicture.js';

const bigPictureModal = document.querySelector('.big-picture');
const usersPhotoContainer = document.querySelector('.pictures');
const pictureUrl = bigPictureModal.querySelector('.big-picture__img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const canselBigPictureButton = bigPictureModal.querySelector(
  '.big-picture__cancel'
);
const socialComments = document.querySelector('.social__comments');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

const openBigPictureModal = (evt) => {
  const objectId = evt.target.parentElement.id;
  const objectById = similarPhoto.find((x) => x.id === Number(objectId));
  if (objectById === undefined) {
    return;
  }
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  bigPictureModal.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  pictureUrl.querySelector('img').src = objectById.url;
  likesCount.textContent = objectById.likes;
  commentsCount.textContent = objectById.comments.length;
  bigPictureModal.querySelector('.social__caption').innerHTML =
    objectById.description;
  initComments(objectById.comments);
  document.addEventListener('keydown', (event) => {
    if (isEscapeKey(event)) {
      closeBigPictureModal();
    }
  });
};

export const initBigPicture = () => {
  usersPhotoContainer.addEventListener('click', (evt) => {
    openBigPictureModal(evt);
  });

  canselBigPictureButton.addEventListener('click', () => {
    closeBigPictureModal();
  });


};
