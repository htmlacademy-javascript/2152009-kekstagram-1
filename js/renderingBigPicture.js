import { isEscapeKey } from './util.js';
import { similarPhoto } from './data.js';

const bigPictureModal = document.querySelector('.big-picture');
const usersPhotoContainer = document.querySelector('.pictures');
const pictureUrl = bigPictureModal.querySelector('.big-picture__img');
const likesCount = bigPictureModal.querySelector('.likes-count');
const commentsCount = bigPictureModal.querySelector('.comments-count');
const canselBigPictureButton = bigPictureModal.querySelector(
  '.big-picture__cancel'
);
const socialCommentCount = bigPictureModal.querySelector(
  '.social__comment-count'
);
const commentsLoader = bigPictureModal.querySelector('.comments-loader');
const socialComments = document.querySelector('.social__comments');

const renderComments = (comments) => {
  socialComments.innerHTML = '';
  comments.forEach(({ avatar, message, name }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('social__comment');
    socialComments.appendChild(listItem);
    const picture = document.createElement('img');
    picture.classList.add('social__picture');
    picture.src = avatar;
    picture.alt = name;
    listItem.appendChild(picture);
    const comment = document.createElement('p');
    comment.classList.add('social__text');
    comment.textContent = message;
    listItem.appendChild(comment);
  });
};

const openBigPictureModal = (evt) => {
  const objectId = evt.target.parentElement.id;
  const objectById = similarPhoto.find((x) => x.id == objectId);

  bigPictureModal.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.querySelector('body').classList.add('modal-open');
  pictureUrl.querySelector('img').src = objectById.url;
  likesCount.textContent = objectById.likes;
  commentsCount.textContent = objectById.comments.length;
  bigPictureModal.querySelector('.social__caption').innerHTML =
    objectById.description;

  renderComments(objectById.comments);
};

usersPhotoContainer.addEventListener('click', (evt) => {
  openBigPictureModal(evt);
});

const closeBigPictureModal = () => {
  bigPictureModal.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
};

canselBigPictureButton.addEventListener('click', () => {
  closeBigPictureModal();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPictureModal();
  }
});
