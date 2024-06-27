const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview');
const picture = pictureUploadPreview.querySelector('img');

const STEP_SCALE = 25;
const MIN_PERCENT = 25;
const MAX_PERCENT = 100;

export const initPictureEditingSize = () =>{
  scaleControlSmaller.addEventListener('click',()=>{
    let scaleControlValueNumber = parseInt(scaleControlValue.value,10);
    if(scaleControlValueNumber !== MIN_PERCENT){
      scaleControlValueNumber -= STEP_SCALE;
      picture.style.transform = `scale(${ scaleControlValueNumber / 100})`;//
      scaleControlValue.value = `${scaleControlValueNumber }%`;

    }
  });
  scaleControlBigger.addEventListener('click',()=>{
    let scaleControlValueNumber = parseInt(scaleControlValue.value,10);
    if(scaleControlValueNumber !== MAX_PERCENT){
      scaleControlValueNumber += STEP_SCALE;
      picture.style.transform = `scale(${ scaleControlValueNumber / 100})`;//
      scaleControlValue.value = `${scaleControlValueNumber }%`;
    }
  });
};
export const resetEditingSize = ()=>{
  pictureUploadPreview.style.transform = 'scale(100%)';
};
