import { isEscapeKey } from './util.js';
const pictureUploadInput = document.querySelector('#upload-file');
const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload__form');
const canselPictureUploadButton = document.querySelector('#upload-cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const pictureUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
let onDocumentKeydown;


const closePictureUploadModal = () => {
  pictureUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pictureUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
  canselPictureUploadButton.removeEventListener('click',closePictureUploadModal);
  imgUploadPreview.className = 'img-upload__preview none';
  imgUploadPreview.style.filter = '';
  pictureUploadPreview.style.transform = 'scale(100%)';
  imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
  effectLevelSlider.classList.add('hidden');
  imgUploadEffectLevel.classList.add('hidden');
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

