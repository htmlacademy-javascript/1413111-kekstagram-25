const bigPic = document.querySelector('.big-picture');
const ulComments = document.querySelector('.social__comments');
const commentLoader = bigPic.querySelector('.social__comments-loader');
const bodyModal = document.body;
const btnClose = bigPic.querySelector('.big-picture__cancel');
const commentsCountEnd = bigPic.querySelector('.comments-count');
const commentsCountStart = bigPic.querySelector('.comments-count_start');

const createBigPic = (bigPictures) => {
  bigPic.querySelector('.big-picture__img img').src = bigPictures[0].url;
  bigPic.querySelector('.likes-count').textContent = bigPictures[0].likes;
  bigPic.querySelector('.comments-count').textContent = bigPictures[0].comments.length;
  bigPic.querySelector('.social__caption').textContent = bigPictures[0].desc;

  let countCommStart = 0;
  let countCommEnd = 5;

  commentsCountEnd.textContent = bigPictures[0].comments.length;
  ulComments.innerHTML = '';
  checkComments();

  const generComments = () => {
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
    checkComments();
  };

  generComments();
  commentLoader.addEventListener('click', () => {
    generComments();
  });

  function checkComments() {
    commentLoader.classList.remove('hidden');
    if (countCommEnd > bigPictures[0].comments.length) {
      countCommEnd = bigPictures[0].comments.length;
    }
    if (countCommStart >= countCommEnd) {
      commentLoader.classList.add('hidden');
    }
  }
  const onBigPicEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup(bigPic);
    }
  };

  document.addEventListener('keydown', onBigPicEscKeydown);

  btnClose.addEventListener('click', () => {
    closePopup(bigPic);
  });
};

function closePopup(popup) {
  popup.classList.add('hidden');
  bodyModal.classList.remove('modal-open');
}

export {
  bodyModal,
  bigPic,
  createBigPic
};
