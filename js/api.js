import {
  showAlert
} from './util.js';

import {
  openFilter
} from './sorting-mini-pic.js';


function getData (onSuccess) {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        openFilter();
        return response.json();
      } else {
        showAlert('Не удалось загрузить фото других людей.');
      }
    })
    .then((miniPic) => {
      onSuccess(miniPic);
    }).catch(() => {
      showAlert('Не удалось загрузить фото других людей.');
    });
}

function sendData (onSuccess, onFail, body) {
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
}

export {
  getData,
  sendData
};
