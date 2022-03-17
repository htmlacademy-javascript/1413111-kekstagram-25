import {
  createArrPhotos
} from './data.js';

const miniPicOtherPeople = document.querySelector('.pictures');
miniPicOtherPeople.querySelector('.pictures__title').classList.remove('visually-hidden');

const miniPicTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const miniPictures = createArrPhotos(25);
const similarLinkFragment = document.createDocumentFragment();

miniPictures.forEach(({url, likes, comments}) => {
  const picElement = miniPicTemplate.cloneNode(true);
  picElement.querySelector('.picture__img').src = url;
  picElement.querySelector('.picture__likes').textContent = likes;
  picElement.querySelector('.picture__comments').textContent = comments.length;
  similarLinkFragment.append(picElement);
});

miniPicOtherPeople.append(similarLinkFragment);
