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

const clearFormPrew = () => {
  previewImg.style.filter = 'none';
  sliderBlockNone.style.display = 'none';
  previewImg.style.transform = `scale(${1})`;
  previewImg.src = '';
  form.reset();
};

function closePrew() {
  imgUpload.classList.add('hidden');
  bodyModal.classList.remove('modal-open');
  clearFormPrew();
  document.removeEventListener('keydown', onPrewEscKeydown);
}

const openPrew = () => {
  imgUpload.classList.remove('hidden');
  bodyModal.classList.add('modal-open');

  document.addEventListener('keydown', onPrewEscKeydown);
};

btnClosePreview.addEventListener('click', () => {
  closePrew();
});

const blockSubmitButton = () => {
  btnPrewForm.disabled = true;
  btnPrewForm.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  btnPrewForm.disabled = false;
  btnPrewForm.textContent = 'Опубликовать';
};

function closeEsc(evt, nameForEsc) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    document.querySelector(nameForEsc).remove();
    document.removeEventListener('keydown', closeEsc);
    document.removeEventListener('mousedown', closeMouse);
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

const closeResultSend = (nameForEsc, nameForMouse) => {
  document.addEventListener('keydown', (evt) => {
    closeEsc(evt, nameForEsc);
  });
  document.addEventListener('mousedown', (evt) => {
    closeMouse(evt, nameForEsc, nameForMouse);
  });
};

const successSend = () => {
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
};

const errorSend = () => {
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
};

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

export {
  setUserFormSubmit,
  openPrew,
  successSend,
  onPrewEscKeydown
};
