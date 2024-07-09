
import {initBigPicture,initRenderingThumbnails} from './rendering-big-picture.js';
import {newPictureForm,setUserFormSubmit,closePictureUploadModal} from './new-picture-form.js';
import { initPictureFormValidation } from './picture-form-validation.js';
import {initPictureEditingSize} from './picture-editing-size.js';
import {initPictureEditEffect} from './picture-edit-effect.js';
import {getData} from './api.js';
import { showAlert } from './util.js';


getData()
  .then(initRenderingThumbnails)
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closePictureUploadModal);


initBigPicture();
newPictureForm();
initPictureFormValidation();
initPictureEditEffect();
initPictureEditingSize();

