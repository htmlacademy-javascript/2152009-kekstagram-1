import {renderPhotoUsers} from './renderingThumbnails.js';
import {initBigPicture} from './renderingBigPicture.js';
import {newPictureForm} from './newPictureForm.js';
import { initPictureFormValidation } from './pictureFormValidation.js';
import {initPictureEditingSize} from './pictureEditingSize.js';
import {initPictureEditEffect} from './pictureEditEffect.js';
renderPhotoUsers();
initBigPicture();
newPictureForm();
initPictureFormValidation();
initPictureEditEffect();
initPictureEditingSize();
