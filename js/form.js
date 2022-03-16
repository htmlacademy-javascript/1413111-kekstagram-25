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
  // eslint-disable-next-line no-prototype-builtins
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
