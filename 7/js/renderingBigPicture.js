import { isEscapeKey } from './util.js';
import { similarPhoto } from './data.js';
import {renderCommentsByStep} from './commentsBigPicture.js';
const bigPictureModal = document.querySelector('.big-picture');
const usersPhotoContainer = document.querySelector('.pictures');
const pictureUrl = bigPictureModal.querySelector('.big-picture__img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const canselBigPictureButton = bigPictureModal.querySelector(
  '.big-picture__cancel'
);

const socialComments = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
socialComments.innerHTML = '';

export const renderComments = (comments) => {


  comments.forEach(({ avatar, message, name }) => {

    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').innerHTML = message;
    commentsListFragment.appendChild(commentElement);


  });
  socialComments.appendChild(commentsListFragment);
};
const openBigPictureModal = (evt) => {
  const objectId = evt.target.parentElement.id;
  const objectById = similarPhoto.find((x) => x.id === Number(objectId));
  if (typeof(objectById) === 'undefined'){
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
  renderCommentsByStep(objectById.comments);
};
const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');


};
export const initBigPicture = ()=>{
  usersPhotoContainer.addEventListener('click', (evt) => {
    openBigPictureModal(evt);
  });

  canselBigPictureButton.addEventListener('click', () => {
    closeBigPictureModal();

  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      closeBigPictureModal();
    }
  });
};

