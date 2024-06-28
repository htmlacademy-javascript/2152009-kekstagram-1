const effectLevelSlider = document.querySelector('.effect-level__slider');
const pictureUploadPreview = document.querySelector('.img-upload__preview');
const picture = pictureUploadPreview .querySelector('img');
const imgUploadEffects = document.querySelector('.img-upload__effects');
const effectLevelValue = document.querySelector('.effect-level__value');
const imgUploadEffectLevel = document.querySelector(
  '.img-upload__effect-level'
);
const customizationEffects = (effect)=>{
  const effectLevelObject = {
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
  picture.classList.remove(
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  );
  picture.classList.add(`effects__preview--${effect}`);
  effectLevelSlider.noUiSlider.updateOptions(effectLevelObject[effect]);
  effectLevelSlider.classList.remove('hidden');
  imgUploadEffectLevel.classList.remove('hidden');
};

const applyEffect = (value) => {
  const currentEffect = picture.className;
  switch (currentEffect) {
    case 'img-upload__preview effects__preview--chrome':
      picture.style.filter = `grayscale(${value})`;
      break;

    case 'img-upload__preview effects__preview--sepia':
      picture.style.filter = `sepia(${value})`;
      break;

    case 'img-upload__preview effects__preview--marvin':
      picture.style.filter = `invert(${value}%)`;
      break;

    case 'img-upload__preview effects__preview--phobos':
      picture.style.filter = `blur(${value}px)`;
      break;

    case 'img-upload__preview effects__preview--heat':
      picture.style.filter = `brightness(${value})`;
      break;

    default:
      picture.style.filter = '';
      break;
  }
};
export const resetEditingEffect = () => {
  picture.className = 'img-upload__preview none';
  picture.style.filter = '';
  picture.classList.remove(
    'effects__preview--chrome',
    'effects__preview--sepia',
    'effects__preview--marvin',
    'effects__preview--phobos',
    'effects__preview--heat'
  );
  effectLevelSlider.classList.add('hidden');
  imgUploadEffectLevel.classList.add('hidden');
};

export const initPictureEditEffect = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
  });
  effectLevelSlider.noUiSlider.on('update', () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();
    applyEffect(effectLevelValue.value);
  });
  imgUploadEffects.addEventListener('click', (evt) => {
    const effect = evt.target.value;
    picture.className = 'img-upload__preview';
    if (effect !== 'none'){
      customizationEffects(effect);
    }else{
      resetEditingEffect();
    }
  });
};

