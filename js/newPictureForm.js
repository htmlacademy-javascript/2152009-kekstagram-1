import { isEscapeKey } from './util.js';
const pictureUploadInput = document.querySelector('#upload-file');
const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload__form');
const canselPictureUploadButton = document.querySelector('#upload-cancel');
let onDocumentKeydown;


const closePictureUploadModal = () => {
  pictureUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pictureUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  canselPictureUploadButton.removeEventListener('click',closePictureUploadModal);
};
onDocumentKeydown = (event) => {
  const {activeElement} = document;
  if (isEscapeKey(event) && activeElement !== inputHashtag && activeElement !== pictureDescription) {
    closePictureUploadModal();
    event.stopPropagation();
  }

};
const openPictureUploadModal = () => {
  pictureUploadOverlay.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
  onDocumentKeydown = (event) => {
    const {activeElement} = document;
    if (isEscapeKey(event) && activeElement !== inputHashtag && activeElement !== pictureDescription) {
      closePictureUploadModal();
      event.stopPropagation();
    }

  };

  document.addEventListener('keydown', onDocumentKeydown);
};
export const newPictureForm = ()=>{
  pictureUploadInput.addEventListener('change', () => {
    openPictureUploadModal();

  });

  canselPictureUploadButton.addEventListener('click', () => {
    closePictureUploadModal();
  });
  pictureUploadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    pictureUploadForm.submit();

  });
};

