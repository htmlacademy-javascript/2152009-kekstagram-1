
import {initBigPicture,initRenderingThumbnails} from './renderingBigPicture.js';
import {newPictureForm,setUserFormSubmit,closePictureUploadModal} from './newPictureForm.js';
import { initPictureFormValidation } from './pictureFormValidation.js';
import {initPictureEditingSize} from './pictureEditingSize.js';
import {initPictureEditEffect} from './pictureEditEffect.js';
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

