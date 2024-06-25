const effectLevelSlider = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
noUiSlider.create(effectLevelSlider,{
  range:{
    min:0,
    max:100,
  },
  start:100,
});
const applyEffect = (value) => {

  const currentEffect = imgUploadPreview.className;
  switch (currentEffect) {
    case 'img-upload__preview effects__preview--chrome':
      imgUploadPreview.style.filter = `grayscale(${value})`;
      break;

    case 'img-upload__preview effects__preview--sepia':
      imgUploadPreview.style.filter = `sepia(${value})`;
      break;

    case 'img-upload__preview effects__preview--marvin':
      imgUploadPreview.style.filter = `invert(${value}%)`;
      break;

    case 'img-upload__preview effects__preview--phobos':
      imgUploadPreview.style.filter = `blur(${value}px)`;
      break;

    case 'img-upload__preview effects__preview--heat':
      imgUploadPreview.style.filter = `brightness(${value})`;
      break;

    default:
      imgUploadPreview.style.filter = '';
      break;
  }
};
export const initPictureEditEffect = ()=>{
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    applyEffect(effectLevelValue.value);
  });
  imgUploadEffects.addEventListener('click',(evt)=>{
    const effect = evt.target.value;
    imgUploadPreview.className = 'img-upload__preview';
    switch(effect){
      case 'chrome':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        imgUploadPreview.classList.add('effects__preview--chrome');
        effectLevelSlider.classList.remove('hidden');
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      } case 'sepia':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        imgUploadPreview.classList.add('effects__preview--sepia');
        effectLevelSlider.classList.remove('hidden');
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1
          },
          start: 1,
          step: 0.1
        });
        break;
      } case 'marvin':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        imgUploadPreview.classList.add('effects__preview--marvin');
        effectLevelSlider.classList.remove('hidden');
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 100,
          step: 1
        });
        break;
      } case 'phobos':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        imgUploadPreview.classList.add('effects__preview--phobos');
        effectLevelSlider.classList.remove('hidden');
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
      } case 'heat':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        imgUploadPreview.classList.add('effects__preview--heat');
        effectLevelSlider.classList.remove('hidden');
        imgUploadEffectLevel.classList.remove('hidden');
        effectLevelSlider.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3
          },
          start: 3,
          step: 0.1
        });
        break;
      } case 'none':{
        imgUploadPreview.classList.remove('effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat');
        effectLevelSlider.classList.add('hidden');
        imgUploadEffectLevel.classList.add('hidden');
        imgUploadPreview.style.filter = '';
        break;
      }
    }
  });

};
