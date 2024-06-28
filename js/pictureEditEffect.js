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
  'effects__preview--chrome':'grayscale',
  'effects__preview--sepia':'sepia',
  'effects__preview--marvin':'invert',
  'effects__preview--phobos':'blur',
  'effects__preview--heat':'brightness'
};
const MEASURE = {
  'effects__preview--chrome':'',
  'effects__preview--sepia':'',
  'effects__preview--marvin':'%',
  'effects__preview--phobos':'px',
  'effects__preview--heat':''
};
const customizationEffects = (effect)=>{
  picture.classList = '';
  picture.classList.add(`effects__preview--${effect}`);
  effectLevelSlider.noUiSlider.updateOptions(EFFECT_LEVEL_OBJECT[effect]);
  effectLevelSlider.classList.remove('hidden');
  imgUploadEffectLevel.classList.remove('hidden');
};

const applyEffect = (value) => {
  const currentEffect = picture.className;
  if (currentEffect !== null){
    picture.style.filter = `${EFFECT_CSS[currentEffect]}(${value}${MEASURE[currentEffect]})`;
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
    applyEffect(effectLevelValue.value);
  });
  imgUploadEffects.addEventListener('click', (evt) => {
    const effect = evt.target.value;
    picture.className = '';
    if (effect !== 'none'){
      customizationEffects(effect);
    }else{
      resetEditingEffect();
    }
  });
};

