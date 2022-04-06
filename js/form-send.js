import {
  statusValidation,
  form,
} from './form-validation.js';

import {
  isEscapeKey
} from './util.js';

import {
  previewImg,
  sliderBlockNone,
} from './form-preview.js';

import {
  bodyModal
} from './big-pic.js';

import {
  sendData
} from './api.js';

const imgUpload = form.querySelector('.img-upload__overlay');
const btnClosePreview = form.querySelector('.img-upload__cancel');
const btnPrewForm = form.querySelector('.img-upload__submit');
const success = document.querySelector('#success')
  .content
  .querySelector('.success');
const error = document.querySelector('#error')
  .content
  .querySelector('.error');

const onPrewEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePrew();
  }
};

function clearFormPrew (){
  previewImg.style.filter = 'none';
  sliderBlockNone.style.display = 'none';
  previewImg.style.transform = `scale(${1})`;
  previewImg.src = '';
  form.reset();
}

function closePrew() {
  imgUpload.classList.add('hidden');
  bodyModal.classList.remove('modal-open');
  clearFormPrew();
  document.removeEventListener('keydown', onPrewEscKeydown);
}

function openPrew () {
  imgUpload.classList.remove('hidden');
  bodyModal.classList.add('modal-open');

  document.addEventListener('keydown', onPrewEscKeydown);
}

btnClosePreview.addEventListener('click', () => {
  closePrew();
});

function blockSubmitButton () {
  btnPrewForm.disabled = true;
  btnPrewForm.textContent = 'Публикую...';
}

function unblockSubmitButton () {
  btnPrewForm.disabled = false;
  btnPrewForm.textContent = 'Опубликовать';
}

function closeEsc(evt, nameForEsc) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector(nameForEsc)) {
      document.querySelector(nameForEsc).remove();
      document.removeEventListener('keydown', closeEsc);
      document.removeEventListener('mousedown', closeMouse);
    }
  }
}

function closeMouse(evt, nameForEsc, nameForMouse) {
  if (document.querySelector(nameForEsc)) {
    if (`.${evt.target.className}` !== nameForMouse) {
      document.querySelector(nameForEsc).remove();
      document.removeEventListener('mousedown', closeMouse);
      document.removeEventListener('keydown', closeEsc);
    }
  }
}

function closeResultSend (nameForEsc, nameForMouse) {
  document.addEventListener('keydown', (evt) => {
    closeEsc(evt, nameForEsc);
  });
  document.addEventListener('mousedown', (evt) => {
    closeMouse(evt, nameForEsc, nameForMouse);
  });
}

function successSend () {
  const successSendFragment = document.createDocumentFragment();
  const element = success.cloneNode(true);
  successSendFragment.append(element);
  document.body.append(successSendFragment);
  closePrew();
  const btnSuccess = element.querySelector('.success__button');
  btnSuccess.addEventListener('click', () => {
    document.querySelector('.success').remove();
  });
  closeResultSend('.success', '.success__inner');
}

function errorSend () {
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

function setUserFormSubmit (onSuccess) {
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
}

export {
  setUserFormSubmit,
  openPrew,
  successSend,
  onPrewEscKeydown
};
