const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const pictureUploadPreview = document.querySelector('.img-upload__preview');
const STEPSCALE = 25;
const MINPERCENT = 25;
const MAXPERCENT = 100;
export const initPictureEditingSize = () =>{
  scaleControlSmaller.addEventListener('click',()=>{
    let scaleControlValueNumber = parseFloat(scaleControlValue.value);
    if(scaleControlValueNumber !== MINPERCENT){
      scaleControlValueNumber -= STEPSCALE;
      pictureUploadPreview.style.transform = `scale(${ scaleControlValueNumber / 100})`;
      scaleControlValue.value = `${scaleControlValueNumber.toString() }%`;

    }
  });
  scaleControlBigger.addEventListener('click',()=>{
    let scaleControlValueNumber = parseFloat(scaleControlValue.value);
    if(scaleControlValueNumber !== MAXPERCENT){
      scaleControlValueNumber += STEPSCALE;
      pictureUploadPreview.style.transform = `scale(${ scaleControlValueNumber / 100})`;
      scaleControlValue.value = `${scaleControlValueNumber.toString() }%`;
    }
  });
};
