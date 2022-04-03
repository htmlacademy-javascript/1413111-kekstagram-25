import {
  miniPicOtherPeople
} from './mini-pic.js';


const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

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

const setFilters = (cb, filter) => {
  filter.addEventListener('click', () => {
    deleteClassName();
    filter.classList.add('img-filters__button--active');
    miniPicOtherPeople.querySelectorAll('a').forEach((elem) => {
      elem.remove();
    });
    cb();
  });
};

const setFilterDefoltClick = (cb) => {
  setFilters(cb, filterDefault);
};

const setFilterRandomClick = (cb) => {
  setFilters(cb, filterRandom);
};

const setFilterDiscussedClick = (cb) => {
  setFilters(cb, filterDiscussed);
};

export {
  openFilter,
  compareSorting,
  setFilterRandomClick,
  setFilterDiscussedClick,
  setFilterDefoltClick,
  getRandomElem
};
