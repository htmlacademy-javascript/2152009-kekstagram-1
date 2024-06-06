import { renderComments } from './renderingBigPicture.js';
const bigPictureModal = document.querySelector('.big-picture');

const stepComments = 5;
const socialCommentCount = bigPictureModal.querySelector('.social__comment-count');
const commentsLoader = bigPictureModal.querySelector('.comments-loader');

export const renderCommentsByStep = (comments) => {
  let renderedCommentsCount = 0;

  const loadComments = () => {
    const remainingComments = comments.length - renderedCommentsCount;
    const nextStep = Math.min(remainingComments, stepComments);

    renderComments(comments.slice(renderedCommentsCount, renderedCommentsCount + nextStep));
    renderedCommentsCount += nextStep;
    socialCommentCount.textContent = `${renderedCommentsCount} из ${comments.length} комментариев`;

    if (renderedCommentsCount >= comments.length) {
      commentsLoader.classList.add('hidden');
      commentsLoader.removeEventListener('click', loadComments);
    }
  };

  loadComments();

  commentsLoader.removeEventListener('click', loadComments);
  commentsLoader.addEventListener('click', loadComments);
};
