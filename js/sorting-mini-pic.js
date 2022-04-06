import {
  miniPicOtherPeople
} from './mini-pic.js';

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');

function openFilter (){
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
}

function compareSorting(picA, picB) {
  return picB.comments.length - picA.comments.length;
}

function getRandomElem(miniPic) {
  const newList = miniPic.slice();
  newList.sort(() => Math.random() - 0.5);
  return newList.splice(0, 10);
}

function deleteClassName() {
  document.querySelectorAll('.img-filters__button').forEach((elem) => {
    elem.classList.remove('img-filters__button--active');
  });
}

function setFilters(cb, filter) {
  filter.addEventListener('click', () => {
    deleteClassName();
    filter.classList.add('img-filters__button--active');
    miniPicOtherPeople.querySelectorAll('a').forEach((elem) => {
      elem.remove();
    });
    cb();
  });
}

export {
  openFilter,
  compareSorting,
  getRandomElem,
  setFilters,
  filterDefault,
  filterRandom,
  filterDiscussed
};
