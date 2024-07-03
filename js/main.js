import {renderPhotoUsers} from './renderingThumbnails.js';
import {initBigPicture} from './renderingBigPicture.js';
import {newPictureForm,setUserFormSubmit,closePictureUploadModal} from './newPictureForm.js';
import { initPictureFormValidation } from './pictureFormValidation.js';
import {initPictureEditingSize} from './pictureEditingSize.js';
import {initPictureEditEffect} from './pictureEditEffect.js';
import {getData} from './api.js';
import { showAlert } from './util.js';

export let receivedPicturesData;
getData()
  .then((similarPhoto) => {
    receivedPicturesData = similarPhoto;
    renderPhotoUsers(similarPhoto);
  })
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
