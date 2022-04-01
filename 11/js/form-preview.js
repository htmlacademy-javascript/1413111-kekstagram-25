import {
  form,
} from './form-validation.js';

import {
  openPrew,
} from './form-send.js';

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const previewImg = form.querySelector('.img-upload__preview img');
const sliderBlockNone = form.querySelector('.img-upload__effect-level');
const ulEffects = form.querySelector('.effects__list');
const scaleValue = form.querySelector('.scale__control--value');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const inputUpload = form.querySelector('.img-upload__input');

const onPicUpload = () => {
  openPrew();
  const file = inputUpload.files[0];
  previewImg.src = URL.createObjectURL(file);
};

inputUpload.addEventListener('change', onPicUpload);

const onPicSmaller = () => {
  const min = 25;
  const currentVal = Number(scaleValue.value.split('%')[0]);
  if (currentVal > min) {
    scaleValue.value = `${currentVal - 25 }%`;
    previewImg.style.transform = `scale(${(currentVal - 25)/100})`;
  } else {
    scaleValue.value = `${25}%`;
  }
};

const onPicBigger = () => {
  const max = 100;
  const currentVal = Number(scaleValue.value.split('%')[0]);
  if (currentVal < max) {
    scaleValue.value = `${currentVal + 25 }%`;
    previewImg.style.transform = `scale(${(currentVal + 25)/100})`;
  } else {
    scaleValue.value = `${100}%`;
  }
};

scaleSmaller.addEventListener('click', onPicSmaller);
scaleBigger.addEventListener('click', onPicBigger);

valueElement.value = 100;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

let filterName = 'effects__preview--none';

const onSliderMove = () => {
  valueElement.value = sliderElement.noUiSlider.get();
  if (filterName === 'effects__preview--chrome') {
    previewImg.style.filter = `grayscale(${valueElement.value})`;
  } else if (filterName === 'effects__preview--sepia') {
    previewImg.style.filter = `sepia(${valueElement.value})`;
  } else if (filterName === 'effects__preview--marvin') {
    previewImg.style.filter = `invert(${valueElement.value}%)`;
  } else if (filterName === 'effects__preview--phobos') {
    previewImg.style.filter = `blur(${valueElement.value}px)`;
  } else if (filterName === 'effects__preview--heat') {
    previewImg.style.filter = `brightness(${valueElement.value})`;
  }
};

sliderElement.noUiSlider.on('update', onSliderMove);

sliderBlockNone.style.display = 'none';

const settings = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  }
};

const onUlChangeEffects = () => {
  filterName = `effects__preview--${form.elements.effect.value}`;
  previewImg.className = filterName;

  sliderBlockNone.style.display = 'block';
  sliderElement.removeAttribute('disabled');

  if (filterName === 'effects__preview--none') {
    sliderBlockNone.style.display = 'none';
    previewImg.style.filter = 'none';
    previewImg.setAttribute('checked', true);
  } else {
    document.getElementById('effect-none').checked = false;
    sliderElement.noUiSlider.updateOptions(settings[form.elements.effect.value]);
  }
};

ulEffects.addEventListener('change', onUlChangeEffects);

export {
  valueElement,
  previewImg,
  sliderBlockNone,
};
