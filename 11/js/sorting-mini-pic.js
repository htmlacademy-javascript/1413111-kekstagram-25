import {
  miniPicOtherPeople
} from './mini-pic.js';


const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const openFilter = () => {
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
};

const compareSorting = (picA, picB) => picB.comments.length - picA.comments.length;

const getRandomElem = (miniPic) => {
  const newList = miniPic.slice();
  newList.sort(() => Math.random() - 0.5);
  return newList.splice(0, 10);
};

const deleteClassName = () => {
  document.querySelectorAll('.img-filters__button').forEach((elem) => {
    elem.classList.remove('img-filters__button--active');
  });
};

const setFilterDefoltClick = (cb) => {
  filterDefault.addEventListener('click', () => {
    deleteClassName();
    filterDefault.classList.add('img-filters__button--active');
    miniPicOtherPeople.querySelectorAll('a').forEach((elem) => {
      elem.remove();
    });
    cb();
  });
};

const setFilterRandomClick = (cb) => {
  filterRandom.addEventListener('click', () => {
    deleteClassName();
    filterRandom.classList.add('img-filters__button--active');
    miniPicOtherPeople.querySelectorAll('a').forEach((elem) => {
      elem.remove();
    });
    cb();
  });
};

const setFilterDiscussedClick = (cb) => {
  filterDiscussed.addEventListener('click', () => {
    deleteClassName();
    filterDiscussed.classList.add('img-filters__button--active');
    miniPicOtherPeople.querySelectorAll('a').forEach((elem) => {
      elem.remove();
    });
    cb();
  });
};

export {
  openFilter,
  compareSorting,
  setFilterRandomClick,
  setFilterDiscussedClick,
  setFilterDefoltClick,
  getRandomElem,
  debounce
};
