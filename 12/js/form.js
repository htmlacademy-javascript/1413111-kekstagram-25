import {
  form,
  inputHas
} from './form-validation.js';

import {
  setUserFormSubmit,
  successSend,
  onPrewEscKeydown
} from './form-send.js';

const inputDesc = form.querySelector('.text__description');

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

setUserFormSubmit(successSend);
