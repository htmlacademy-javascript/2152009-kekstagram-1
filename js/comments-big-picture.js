const bigPictureModal = document.querySelector('.big-picture');
const socialCommentCount = bigPictureModal.querySelector(
  '.social__comment-count'
);
const commentTemplate = document
  .querySelector('#comments')
  .content.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();
const socialComments = document.querySelector('.social__comments');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

const STEP = 5;
let allComments = [];
let renderedCommentsCount = 0;

const renderComments = (comments) => {
  comments.forEach(({ avatar, message, name }) => {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = avatar;
    commentElement.querySelector('.social__picture').alt = name;
    commentElement.querySelector('.social__text').innerHTML = message;
    commentsListFragment.appendChild(commentElement);
  });
  socialComments.appendChild(commentsListFragment);
};


const loadComments = () => {
  const remainingComments = allComments.length - renderedCommentsCount;
  const nextStep = Math.min(remainingComments, STEP);

  renderComments(
    allComments.slice(renderedCommentsCount, renderedCommentsCount + nextStep)
  );
  renderedCommentsCount += nextStep;
  socialCommentCount.textContent = `${renderedCommentsCount} из ${allComments.length} комментариев`;
  if (renderedCommentsCount >= allComments.length) {
    commentsLoader.classList.add('hidden');
    commentsLoader.removeEventListener('click', loadComments);
  }

};

export const initComments = () => {
  commentsLoader.addEventListener('click', loadComments);
};

export const refreshComments = (comments)=>{
  allComments = comments;
  renderedCommentsCount = 0;
  socialComments.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  loadComments();
};
