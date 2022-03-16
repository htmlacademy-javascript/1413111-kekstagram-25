import {
  createArrPhotos
} from './data.js';

const bigPic = document.querySelector('.big-picture');
// bigPic.classList.remove('hidden');
const ulComments = document.querySelector('.social__comments');
const liComments = ulComments.querySelectorAll('.social__comment');
const commentCount = bigPic.querySelector('.social__comment-count');
commentCount.classList.add('hidden');
const commentLoader = bigPic.querySelector('.social__comments-loader');
commentLoader.classList.add('hidden');
const bodyModal = document.body;
// bodyModal.classList.add('modal-open');
const btnClose = bigPic.querySelector('.big-picture__cancel');

const bigPictures = createArrPhotos(2);

bigPic.querySelector('.big-picture__img img').src = bigPictures[0].url;
bigPic.querySelector('.likes-count').textContent = bigPictures[0].likes;
bigPic.querySelector('.comments-count').textContent = bigPictures[0].comments.length;
bigPic.querySelector('.social__caption').textContent = bigPictures[0].desc;

liComments.forEach((comments) => {
  const socialPic = comments.querySelector('.social__picture');
  socialPic.src = bigPictures[0].comments[0].avatar;
  socialPic.alt = bigPictures[0].comments[0].alt;
  comments.querySelector('.social__text').textContent = bigPictures[0].comments[0].message;
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

export {closePopup,bodyModal};
