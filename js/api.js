import {
  renderSimilarList
} from './mini-pic.js';
import {
  showAlert
} from './util.js';

const SIMILAR_MINI_PIC_COUNT = 25;

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
    }).catch(() => {
      showAlert('Не удалось загрузить фото других людей. Попробуйте обновить страницу');
    });
};

getData((miniPic) => {
  renderSimilarList(miniPic.slice(0, SIMILAR_MINI_PIC_COUNT));
});

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
