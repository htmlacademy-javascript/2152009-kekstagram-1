import { isEscapeKey } from './util.js';

const pictureUploadInput = document.querySelector('#upload-file');
const pictureUploadOverlay = document.querySelector('.img-upload__overlay');
const pictureUploadForm = document.querySelector('.img-upload__form');
const canselPictureUploadButton = document.querySelector('#upload-cancel');
const pictureUploadFormSubmit = document.querySelector('.img-upload__submit');
const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pristine = new Pristine(pictureUploadForm,{
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

pristine.addValidator(inputHashtag, (value) => {
  const hashtagRegex = /^(#[a-zA-ZА-ЯЁа-яё0-9]{1,19}(?:\s|$)){0,5}$/;
  const isValid = hashtagRegex.test(value.trim());
  const hashtags = value.toLowerCase().split(/\s+/);
  const uniqueHashtags = new Set(hashtags);

  return isValid && hashtags.length === uniqueHashtags.size;
}, 'Хэштег должен соответствовать регулярному выражению: /^(#[a-zA-ZА-ЯЁа-яё0-9]{1,19}){0,5}$/, быть уникальным,хэштеги записываются через пробел.Допускается максимальное число хэштегов: 5');

pristine.addValidator(pictureDescription, (value) => value.length <= 140, 'Максимум 140 символов');

let onDocumentKeydown;
const validatePictureForm = () => {
  pictureUploadForm.addEventListener('input', (evt) => {
    evt.preventDefault();
    pristine.addError(pictureUploadForm, '');
    const isValid = pristine.validate();
    pictureUploadFormSubmit.disabled = !isValid;
  });
};

const closePictureUploadModal = () => {
  pictureUploadOverlay.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  pictureUploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
};

const openPictureUploadModal = () => {
  pictureUploadOverlay.classList.remove('hidden');

  document.querySelector('body').classList.add('modal-open');
  onDocumentKeydown = (event) => {
    const activeElement = document.activeElement;
    if (isEscapeKey(event) && activeElement !== inputHashtag && activeElement !== pictureDescription) {
      closePictureUploadModal();
      event.stopPropagation();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);
};

pictureUploadInput.addEventListener('change', () => {
  openPictureUploadModal();

});

canselPictureUploadButton.addEventListener('click', () => {
  closePictureUploadModal();
});
pictureUploadForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if(pristine.validate()){
    pictureUploadForm.submit();
  }
});

pictureUploadForm.addEventListener('input',()=>{
  validatePictureForm();

  console.log('Adding test error to inputHashtag');

});
