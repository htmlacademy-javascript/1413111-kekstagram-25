import {
  showAlert
} from './util.js';

import {
  openFilter
} from './sorting-mini-pic.js';


const getData = (onSuccess) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось загрузить фото других людей. Попробуйте обновить страницу');
      }
    })
    .then((miniPic) => {
      onSuccess(miniPic);
      openFilter();
    }).catch(() => {
      showAlert('Не удалось загрузить фото других людей. Попробуйте обновить страницу');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagram', {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  })
    .catch(() => {
      onFail();
    });
};
export {
  getData,
  sendData
};
