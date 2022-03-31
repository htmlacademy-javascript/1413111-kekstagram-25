import {
  bodyModal
} from './big-pic.js';

import {
  uniq,
  isEscapeKey,
  showAlert
} from './util.js';

import {
  sendData
} from './api.js';

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
const ulEffects = form.querySelector('.effects__list');
const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');
const sliderBlockNone = form.querySelector('.img-upload__effect-level');
const btnPrewForm = form.querySelector('.img-upload__submit');
const success = document.querySelector('#success')
  .content
  .querySelector('.success');
const error = document.querySelector('#error')
  .content
  .querySelector('.error');

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

const onPrewEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePrew();
  }
};

function clearFormPrew() {
  document.getElementById('effect-none').checked = true;
  previewImg.style.filter = 'none';
  sliderBlockNone.style.display = 'none';
  inputHas.value = '';
  inputDesc.value = '';
  previewImg.style.transform = `scale(${1})`;
}

function closePrew() {
  imgUpload.classList.add('hidden');
  bodyModal.classList.remove('modal-open');
  previewImg.src = '';
  clearFormPrew();
  document.removeEventListener('keydown', onPrewEscKeydown);
}

function openPrew() {
  imgUpload.classList.remove('hidden');
  bodyModal.classList.add('modal-open');

  document.addEventListener('keydown', onPrewEscKeydown);
}

const onPicUpload = () => {
  openPrew();
  const file = inputUpload.files[0];
  previewImg.src = URL.createObjectURL(file);
};

inputUpload.addEventListener('change', onPicUpload);

btnClosePreview.addEventListener('click', () => {
  closePrew();
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

const blockSubmitButton = () => {
  btnPrewForm.disabled = true;
  btnPrewForm.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  btnPrewForm.disabled = false;
  btnPrewForm.textContent = 'Опубликовать';
};

function closeResultSend(nameForEsc, nameForMouse) {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      document.querySelector(nameForEsc).remove();
    }
  });
  document.addEventListener('mousedown', (evt) => {
    if (evt.target.className !== nameForMouse) {
      document.querySelector(nameForEsc).remove();
    }
  });
}

function successSend() {
  const successSendFragment = document.createDocumentFragment();
  const element = success.cloneNode(true);
  successSendFragment.append(element);
  document.body.append(successSendFragment);
  closePrew();
  const btnSuccess = element.querySelector('.success__button');
  btnSuccess.addEventListener('click', () => {
    document.querySelector('.success').remove();
  });
  closeResultSend('.success','.success__inner');
}

function errorSend() {
  const errorSendFragment = document.createDocumentFragment();
  const element = error.cloneNode(true);
  errorSendFragment.append(element);
  document.body.append(errorSendFragment);
  closePrew();
  const btnError = element.querySelector('.error__button');
  btnError.addEventListener('click', () => {
    document.querySelector('.error').remove();
  });
  closeResultSend('.error', '.error__inner');
}

const setUserFormSubmit = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (!statusValidation) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          errorSend();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

setUserFormSubmit(successSend);
