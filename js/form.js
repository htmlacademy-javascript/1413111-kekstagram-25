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

// const pristine = new Pristine(form, {
//   classTo: 'form',
//   errorTextParent: 'form',
//   errorTextTag: 'span',
//   errorTextClass: 'form__error'
// });

const regexp = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

function parsHashToArr() {
  const hashtags = inputHas.value.trim().split(/(?=#)/g);
  for (let index = 0; index < hashtags.length; index++) {
    if (regexp.test(hashtags[index].trim())) {
      console.log('можно отправлять');
    } else {
      // pristine.addError(form, 'test errors');
      console.log('не валидна');
    }
  }
}


inputHas.addEventListener('change', () => {
  parsHashToArr();
});
