import { isEscapeKey } from './util.js';
import { refreshComments, initializeComments } from './comments-big-picture.js';
import { initPictures } from './filters-for-pictures.js';
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
const imgFilters = document.querySelector('.img-filters');
export const initRenderingThumbnails = (data) => {
  receivedPicturesData = data;
  initPictures(data);
  imgFilters.classList.remove('img-filters--inactive');
};
const openBigPictureModal = (eventClickPhoto) => {
  if (eventClickPhoto.target.closest('[data-thumbnails-id]')) {
    const pictureElement = eventClickPhoto.target.closest('.picture');
    const objectId = pictureElement.getAttribute('data-thumbnails-id');
    const objectById = receivedPicturesData.find(
      (x) => x.id === Number(objectId)
    );
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
    bigPictureModal.querySelector('.social__caption').textContent =
      objectById.description;
    refreshComments(objectById.comments);
    onDocumentKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        closeBigPictureModal();
      }
    };

    document.addEventListener('keydown', onDocumentKeydown);
  }
  initializeComments();
};

export const initializeBigPicture = () => {
  usersPhotoContainer.addEventListener('click', (evt) => {
    openBigPictureModal(evt);
  });

  canselBigPictureButton.addEventListener('click', () => {
    closeBigPictureModal();
  });
};
