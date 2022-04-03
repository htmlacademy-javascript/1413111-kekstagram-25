import './form.js';
import {
  getData
} from './api.js';

import {
  renderSimilarList
} from './mini-pic.js';

import {
  setFilters,getRandomElem,compareSorting,filterDefault,filterRandom,filterDiscussed
} from './sorting-mini-pic.js';

getData((miniPic) => {
  renderSimilarList(miniPic);
  setFilters(() => renderSimilarList(getRandomElem(miniPic)), filterRandom);
  setFilters(() => renderSimilarList(miniPic, compareSorting), filterDiscussed);
  setFilters(() => renderSimilarList(miniPic), filterDefault);
});
