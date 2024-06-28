const effectLevelSlider = document.querySelector('.effect-level__slider');
const pictureUploadPreview = document.querySelector('.img-upload__preview');
const picture = pictureUploadPreview .querySelector('img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector(
  '.img-upload__effect-level'
);
const EFFECT_LEVEL_OBJECT = {
  chrome:{
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  sepia:{
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  },
  marvin:{
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
  },
  phobos:{
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
  },
  heat:{
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
  }

};
const EFFECT_CSS = {
  chrome:'grayscale',
  sepia:'sepia',
  marvin:'invert',
  phobos:'blur',
  heat:'brightness'
};
const MEASURE = {
  chrome:'',
  sepia:'',
  marvin:'%',
  phobos:'px',
  heat:''
};
const customizationEffects = (effect)=>{
  picture.classList.add(`effects__preview--${effect}`);
  effectLevelSlider.noUiSlider.updateOptions(EFFECT_LEVEL_OBJECT[effect]);
  effectLevelSlider.classList.remove('hidden');
  imgUploadEffectLevel.classList.remove('hidden');
};

const applyEffect = (effect,value) => {
  const currentEffect = picture.className;
  if (currentEffect){
    picture.style.filter = `${EFFECT_CSS[effect]}(${value}${MEASURE[effect]})`;
  }else{
    picture.style.filter = '';
  }
};
export const resetEditingEffect = () => {
  picture.className = '';
  picture.style.filter = '';
  effectLevelSlider.classList.add('hidden');
  imgUploadEffectLevel.classList.add('hidden');
};

export const initPictureEditEffect = () => {
  let currentEffect = 'none';
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    connect:'lower',
    start: 100,
  });
  effectLevelSlider.noUiSlider.on('update', () => {

    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    applyEffect(currentEffect,effectLevelValue.value);
  });
  imgUploadEffects.addEventListener('change', (evt) => {
    currentEffect = evt.target.value;
    if (currentEffect === 'none'){
      resetEditingEffect();

      return;
    }
    customizationEffects(currentEffect);

  });
};

