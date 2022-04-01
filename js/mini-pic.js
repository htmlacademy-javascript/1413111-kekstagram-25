import {
  bigPic,
  bodyModal,
  createBigPic
} from './big-pic.js';

const miniPicOtherPeople = document.querySelector('.pictures');

const miniPicTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const onMiniPicClick = (evt, miniPictures) => {
  const currentPic = Number(evt.target.getAttribute('data-id'));
  const currentData = miniPictures.filter((pic) => pic.id === currentPic);
  createBigPic(currentData);
  bigPic.classList.remove('hidden');
  bodyModal.classList.add('modal-open');
};

const renderSimilarList = (miniPictures) => {
  const similarLinkFragment = document.createDocumentFragment();

  miniPictures.forEach(({
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
  miniPicOtherPeople.querySelector('.pictures__title').classList.remove('visually-hidden');
};

export {
  renderSimilarList
};
