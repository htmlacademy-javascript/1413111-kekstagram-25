import {
  bigPic,
  bodyModal,
  createBigPic
} from './big-pic.js';

import {
  debounce
} from './util.js';

const miniPicOtherPeople = document.querySelector('.pictures');

const miniPicTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function onMiniPicClick (evt, miniPictures) {
  const currentPic = Number(evt.target.getAttribute('data-id'));
  const currentData = miniPictures.filter((pic) => pic.id === currentPic);
  createBigPic(currentData);
  bigPic.classList.remove('hidden');
  bodyModal.classList.add('modal-open');
}

const renderSimilarList = debounce((miniPictures,sorting) => {
  const similarLinkFragment = document.createDocumentFragment();
  miniPictures
    .slice()
    .sort(sorting)
    .forEach(({
      url,
      likes,
      comments,
      id
    }) => {
      const picElement = miniPicTemplate.cloneNode(true);
      picElement.querySelector('.picture__img').src = url;
      picElement.querySelector('.picture__likes').textContent = likes;
      picElement.querySelector('.picture__comments').textContent = comments.length;
      picElement.querySelector('.picture__img').setAttribute('data-id', id);
      similarLinkFragment.append(picElement);

      picElement.addEventListener('click', (evt) => onMiniPicClick(evt, miniPictures));
    });
  miniPicOtherPeople.append(similarLinkFragment);
});

export {
  renderSimilarList,
  miniPicOtherPeople
};
