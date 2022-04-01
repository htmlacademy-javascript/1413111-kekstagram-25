import {
  renderSimilarList
} from './mini-pic.js';

import {
  showAlert
} from './util.js';

import {
  openFilter,
  setFilterRandomClick,
  setFilterDiscussedClick,
  compareSorting,
  setFilterDefoltClick,
  getRandomElem,
  debounce
} from './sorting-mini-pic.js';

const RERENDER_DELAY = 500;

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

getData((miniPic) => {
  renderSimilarList(miniPic);
  setFilterRandomClick(debounce(() => renderSimilarList(getRandomElem(miniPic)), RERENDER_DELAY));
  setFilterDiscussedClick(debounce(() => renderSimilarList(miniPic, compareSorting), RERENDER_DELAY));
  setFilterDefoltClick(debounce(() => renderSimilarList(miniPic), RERENDER_DELAY));
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
