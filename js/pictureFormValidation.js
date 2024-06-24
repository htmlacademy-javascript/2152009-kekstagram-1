const inputHashtag = document.querySelector('.text__hashtags');
const pictureDescription = document.querySelector('.text__description');
const pictureUploadForm = document.querySelector('.img-upload__form');
const pictureUploadFormSubmit = document.querySelector('.img-upload__submit');

const pristine = new Pristine(pictureUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});


const initPictureFromValidation = ()=>{


  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    return hashtags.every((tag) => tag.startsWith('#'));
  }, 'Хэш-тег должен начинаться с символа #', 1,true);
  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    return hashtags.every((tag) => tag.length > 1);
  }, 'Хэш-тег не может состоять только из одной решётки',2,true);
  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    const hashtagRegex = /^#[a-zA-ZА-ЯЁа-яё0-9]+$/;
    return hashtags.every((tag) => hashtagRegex.test(tag));
  }, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы, символы пунктуации и т. д.',3,true);
  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    return hashtags.every((tag) => tag.length <= 20);
  }, 'Максимальная длина одного хэш-тега 20 символов, включая решётку',4,true);
  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    const containsSpaces = value.trim().includes(' ');
    return (hashtags.length <= 1 || containsSpaces);
  }, 'Хэш-теги разделяются пробелами',5,true);

  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const uniqueHashtags = new Set(hashtags);
    return hashtags.length === uniqueHashtags.size;
  }, 'Один и тот же хэш-тег не может быть использован дважды',6,true);

  pristine.addValidator(inputHashtag, (value) => {
    const hashtags = value.trim().split(/\s+/).filter(Boolean);
    return hashtags.length <= 5;
  }, 'Нельзя указать больше пяти хэш-тегов',7);
  pristine.addValidator(pictureDescription, (value) => value.length <= 140, 'Максимум 140 символов');

  inputHashtag.addEventListener('input', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    pictureUploadFormSubmit.disabled = !isValid;

  });
  pictureDescription .addEventListener('input', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    pictureUploadFormSubmit.disabled = !isValid;
  });
};
export const validatePictureForm = () => {
  initPictureFromValidation();
};
