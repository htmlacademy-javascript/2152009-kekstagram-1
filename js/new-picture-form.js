import { isEscapeKey } from './util.js';
import { resetEditingSize } from './picture-editing-size.js';
import { resetEditingEffect } from './picture-edit-effect.js';
import { sendData } from './api.js';
import { renderMessage, SubmitButtonText } from './util.js';
const pictureUploadInput = document.querySelector('#upload-file');
const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload');
const cancelPictureUploadButton = document.querySelector('#upload-cancel');
const pictureUploardPreview = document
  .querySelector('.img-upload__preview')
  .querySelector('img');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

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
onDocumentKeydown = (evt) => {
  const { activeElement } = document;
  if (
    isEscapeKey(evt) &&
    activeElement !== inputHashtag &&
    activeElement !== pictureDescription
  ) {
    closePictureUploadModal();
    evt.stopPropagation();
  }
};
const openPictureUploadModal = () => {
  pictureUploadOverlay.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
  onDocumentKeydown = (evt) => {
    const { activeElement } = document;
    if (
      isEscapeKey(evt) &&
      activeElement !== inputHashtag &&
      activeElement !== pictureDescription
    ) {
      closePictureUploadModal();
      evt.stopPropagation();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
};
export const displayNewPictureForm = () => {
  pictureUploadInput.addEventListener('change', () => {
    const file = pictureUploadInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      pictureUploardPreview.src = URL.createObjectURL(file);
    }
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
  pictureUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    blockSubmitButton();
    sendData(new FormData(evt.target))
      .then(onSuccess)
      .then(renderMessage('success'))
      .catch((err) => {
        renderMessage(err);
      })
      .finally(unblockSubmitButton);
  });
};
