import { isEscapeKey } from './util.js';
import { refreshComments,initComments } from './commentsBigPicture.js';
import { renderPhotoUsers } from './renderingThumbnails.js';
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
let onDocumentKeydown;
let receivedPicturesData;
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};


export const initRenderingThumbnails = (data) => {
  receivedPicturesData = data;
  renderPhotoUsers(data);
};
const openBigPictureModal = (evt) => {

  if (evt.target.closest('[data-thumbnails-id]')){
    const pictureElement = evt.target.closest('.picture');
    const objectId = pictureElement.getAttribute('data-thumbnails-id');
    const objectById = receivedPicturesData.find((x) => x.id === Number(objectId));
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
    refreshComments(objectById.comments);
    onDocumentKeydown = (event) => {
      if (isEscapeKey(event)) {
        closeBigPictureModal();
      }
    };

    document.addEventListener('keydown', onDocumentKeydown);
  }

};

export const initBigPicture = () => {
  usersPhotoContainer.addEventListener('click', (evt) => {
    openBigPictureModal(evt);
  });

  canselBigPictureButton.addEventListener('click', () => {
    closeBigPictureModal();
  });

  initComments();
};
