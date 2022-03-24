import {
  closePopup,
  bodyModal
} from './big-pic.js';

const form = document.querySelector('.img-upload__form');
const inputUpload = form.querySelector('.img-upload__input');
const previewImg = form.querySelector('.img-upload__preview img');
const btnClosePreview = form.querySelector('.img-upload__cancel');
const imgUpload = form.querySelector('.img-upload__overlay');
const inputHas = form.querySelector('.text__hashtags');
const inputDesc = form.querySelector('.text__description');
const scaleSmaller = form.querySelector('.scale__control--smaller');
const scaleBigger = form.querySelector('.scale__control--bigger');
const scaleValue = form.querySelector('.scale__control--value');
const effectInput = form.querySelectorAll('.effects__radio');
const ulEffects = form.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');

scaleSmaller.addEventListener('click', () => {
  const min = 25;
  const currentVal = Number(scaleValue.value.split('%')[0]);
  if (currentVal > min) {
    scaleValue.value = `${currentVal - 25 }%`;
    previewImg.style.transform = `scale(${(currentVal - 25)/100})`;
  } else {
    scaleValue.value = `${25}%`;
  }
});
scaleBigger.addEventListener('click', () => {
  const max = 100;
  const currentVal = Number(scaleValue.value.split('%')[0]);
  if (currentVal < max) {
    scaleValue.value = `${currentVal + 25 }%`;
    previewImg.style.transform = `scale(${(currentVal + 25)/100})`;
  } else {
    scaleValue.value = `${100}%`;
  }
});

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

sliderElement.noUiSlider.on('update', () => {
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
});

sliderElement.setAttribute('disabled', true);

ulEffects.addEventListener('click', (evt) => {
  if (evt.target.classList.value.indexOf('effects__preview') > -1) {
    filterName = evt.target.classList.value.split(' ')[2];
    previewImg.className = filterName;

    sliderElement.removeAttribute('disabled');
    if (filterName === 'effects__preview--chrome') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
    } else if (filterName === 'effects__preview--sepia') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
    } else if (filterName === 'effects__preview--marvin') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
    } else if (filterName === 'effects__preview--phobos') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    } else if (filterName === 'effects__preview--heat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
    } else if (filterName === 'effects__preview--none') {
      sliderElement.setAttribute('disabled', true);
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
    }
  }
});

const onPrewEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup(imgUpload);
    previewImg.src = '';
  }
};

const closePrew = function () {
  btnClosePreview.addEventListener('click', () => {
    closePopup(imgUpload);
    previewImg.src = '';
  });
  document.addEventListener('keydown', onPrewEscKeydown);

};

inputUpload.addEventListener('change', () => {
  closePrew();
  const file = inputUpload.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    previewImg.src = reader.result;
    imgUpload.classList.remove('hidden');
    bodyModal.classList.add('modal-open');
  };
});

inputHas.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPrewEscKeydown);
});

inputHas.addEventListener('blur', () => {
  document.addEventListener('keydown', onPrewEscKeydown);
});


inputDesc.addEventListener('focus', () => {
  document.removeEventListener('keydown', onPrewEscKeydown);
});

inputDesc.addEventListener('blur', () => {
  document.addEventListener('keydown', onPrewEscKeydown);
});

const pristine = new Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const regexp = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

function uniq(a) {
  const seen = {};
  return a.filter((item) => seen.hasOwnProperty(item.trim()) ? false : (seen[item.trim()] = true));
}
let statusValidation = false;

function validateData() {
  const hashtags = inputHas.value.trim().split(/(?=#)/g);
  if (hashtags.length > 5) {
    statusValidation = true;
    pristine.addError(inputHas, 'Хештегов не должно быть больше 5');
  } else {
    statusValidation = false;
  }

  if (hashtags.length !== uniq(hashtags.slice(0)).length) {
    statusValidation = true;
    pristine.addError(inputHas, 'Хештеги не должны повторяться');
  } else {
    statusValidation = false;
  }

  for (let index = 0; index < hashtags.length; index++) {
    if (index !== hashtags.length - 1) {
      if (hashtags[index].slice(-1) !== ' ') {
        statusValidation = true;
        pristine.addError(inputHas, 'хештеги должны быть разделены пробелом');
      } else {
        statusValidation = false;
      }
    }

    if (!regexp.test(hashtags[index].trim())) {
      statusValidation = true;
      pristine.addError(inputHas, 'Не валидный хештег');
    } else {
      statusValidation = false;
    }
  }
}

inputHas.addEventListener('input', () => {
  validateData();
});

form.addEventListener('submit', (event) => {
  if (statusValidation) {
    event.preventDefault();
  }
});
