import {
  initializeBigPicture,
  initRenderingThumbnails,
} from './rendering-big-picture.js';
import {
  displayNewPictureForm,
  setUserFormSubmit,
  closePictureUploadModal,
} from './new-picture-form.js';
import { initializePictureFormValidation } from './picture-form-validation.js';
import { initializePictureEditingSize } from './picture-editing-size.js';
import { initializePictureEditEffect } from './picture-edit-effect.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then(initRenderingThumbnails)
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closePictureUploadModal);

initializeBigPicture();
displayNewPictureForm();
initializePictureFormValidation();
initializePictureEditEffect();
initializePictureEditingSize();
