import {
  createArrPhotos,
  createPost
} from './data.js';

const bigPic = document.querySelector('.big-picture');
bigPic.classList.remove('hidden');
const ulComments = document.querySelector('.social__comments');
// const liComments = ulComments.querySelectorAll('.social__comment');
// const commentCount = bigPic.querySelector('.social__comment-count');
// commentCount.classList.add('hidden');
const commentLoader = bigPic.querySelector('.social__comments-loader');
// commentLoader.classList.add('hidden');
const bodyModal = document.body;
// bodyModal.classList.add('modal-open');
const btnClose = bigPic.querySelector('.big-picture__cancel');
const commentsCountEnd = bigPic.querySelector('.comments-count');
const commentsCountStart = bigPic.querySelector('.comments-count_start');

const bigPictures = createArrPhotos(1);

bigPic.querySelector('.big-picture__img img').src = bigPictures[0].url;
bigPic.querySelector('.likes-count').textContent = bigPictures[0].likes;
bigPic.querySelector('.comments-count').textContent = bigPictures[0].comments.length;
bigPic.querySelector('.social__caption').textContent = bigPictures[0].desc;

let countCommStart = 0;
let countCommEnd = 5;
let countComm = 5;

commentsCountEnd.textContent = bigPictures[0].comments.length;

function generComments() {
  for (let index = countCommStart; index < countCommEnd; index++) {
    const element = bigPictures[0].comments;
    const liCom = document.createElement('li');
    const pCom = document.createElement('p');
    const imgCom = document.createElement('img');
    liCom.classList.add('social__comment');
    ulComments.append(liCom);
    imgCom.classList.add('social__picture');
    imgCom.src = element[index].avatar;
    imgCom.alt = 'Аватар комментатора фотографии';
    imgCom.width = '35';
    imgCom.height = '35';
    liCom.append(imgCom);
    pCom.classList.add('social__text');
    pCom.textContent = element[index].message;
    liCom.append(pCom);
  }
  commentsCountStart.textContent = countCommEnd;
  countCommStart += 5;
  countCommEnd += 5;


  if (countCommEnd > bigPictures[0].comments.length) {
    countCommEnd = bigPictures[0].comments.length;
  }

  if (countCommStart >=countCommEnd) {
    commentLoader.classList.add('hidden');
  }
}
generComments();

commentLoader.addEventListener('click', () => {
  generComments();
});


function closePopup(popup) {
  popup.classList.add('hidden');
  bodyModal.classList.remove('modal-open');
}
const onBigPicEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup(bigPic);
  }
};

// btnClose.addEventListener('click', () => {
//   closePopup(bigPic,bodyModal);
// });

// document.addEventListener('keydown', onBigPicEscKeydown);

export {
  closePopup,
  bodyModal
};
