import {
  renderSimilarList
} from './mini-pic.js';

import {
  showAlert,
  debounce
} from './util.js';

import {
  openFilter,
  setFilterRandomClick,
  setFilterDiscussedClick,
  compareSorting,
  setFilterDefoltClick,
  getRandomElem,
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

function nameFun(miniPic){
  setFilterRandomClick(() => renderSimilarList(getRandomElem(miniPic)));
  setFilterDiscussedClick(() => renderSimilarList(miniPic, compareSorting));
  setFilterDefoltClick(() => renderSimilarList(miniPic));
}

getData((miniPic) => {
  renderSimilarList(miniPic);
  debounce(nameFun(miniPic));

  // setFilterRandomClick(debounce(() => renderSimilarList(getRandomElem(miniPic))));
  // setFilterDiscussedClick(debounce(() => renderSimilarList(miniPic, compareSorting)));
  // setFilterDefoltClick(debounce(() => renderSimilarList(miniPic)));
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
