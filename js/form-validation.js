const form = document.querySelector('.img-upload__form');
const inputHas = form.querySelector('.text__hashtags');

import {
  uniq
} from './util.js';

const pristine = window.Pristine(form, {
  classTo: 'img-upload__form',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'form__error',
});

const regexp = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

let statusValidation = false;

const validateData = () => {
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
};

inputHas.addEventListener('input', () => {
  validateData();
});

export {
  statusValidation,
  form,
  inputHas
};
