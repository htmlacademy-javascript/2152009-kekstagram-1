import { isEscapeKey } from './util.js';
import { resetEditingSize } from './pictureEditingSize.js';
import { resetEditingEffect } from './pictureEditEffect.js';
import { sendData } from './api.js';
import { renderMessage,SubmitButtonText } from './util.js';
const pictureUploadInput = document.querySelector('#upload-file');
const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload');
const cancelPictureUploadButton = document.querySelector('#upload-cancel');

let onDocumentKeydown;


export const closePictureUploadModal = () => {
  pictureUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pictureUploadInput.value = '';
  inputHashtag.value = '';
  pictureDescription.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelPictureUploadButton.removeEventListener(
    'click',
    closePictureUploadModal
  );
  resetEditingSize();
  resetEditingEffect();
};
onDocumentKeydown = (event) => {
  const { activeElement } = document;
  if (
    isEscapeKey(event) &&
    activeElement !== inputHashtag &&
    activeElement !== pictureDescription
  ) {
    closePictureUploadModal();
    event.stopPropagation();
  }
};
const openPictureUploadModal = () => {
  pictureUploadOverlay.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
  onDocumentKeydown = (event) => {
    const { activeElement } = document;
    if (
      isEscapeKey(event) &&
      activeElement !== inputHashtag &&
      activeElement !== pictureDescription
    ) {
      closePictureUploadModal();
      event.stopPropagation();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
};
export const newPictureForm = () => {
  pictureUploadInput.addEventListener('change', () => {
    openPictureUploadModal();
  });

  cancelPictureUploadButton.addEventListener('click', () => {
    closePictureUploadModal();
  });
};
const blockSubmitButton = () => {
  cancelPictureUploadButton.disabled = true;
  cancelPictureUploadButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  cancelPictureUploadButton.disabled = false;
  cancelPictureUploadButton.textContent = SubmitButtonText.IDLE;
};
export const setUserFormSubmit = (onSuccess) => {
  pictureUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    blockSubmitButton();
    sendData(new FormData(event.target))
      .then(onSuccess)
      .then(renderMessage('success'))
      .catch((err) => {
        renderMessage(err);
      })
      .finally(unblockSubmitButton);
  });
};
