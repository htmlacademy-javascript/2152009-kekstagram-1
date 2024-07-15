
const usersPhotoContainer = document.querySelector('.pictures');
const photoTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');

const usersPhotoListFragment = document.createDocumentFragment();

export const renderPhotoUsers = (similarPhotoUsers) => {
  similarPhotoUsers.forEach(({ url,comments,likes,id }) => {

    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').innerHTML = likes;
    photoElement.querySelector('.picture__comments').innerHTML = comments.length;
    photoElement.setAttribute('data-thumbnails-id',`${id}`);
    usersPhotoListFragment.appendChild(photoElement);
  });

  usersPhotoContainer.appendChild(usersPhotoListFragment);
};

