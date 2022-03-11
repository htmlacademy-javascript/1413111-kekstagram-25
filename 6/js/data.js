import {getRandomNumber, getRandomArrayElem} from './util.js';

const DESC = ['Это я в Москве у мавзолея Ленина.', 'Это на Тверской у чужого Мерина.', 'Это я на пляже летом в Таганроге.'];
const MESSAGE = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
const NAME = ['Игорь', 'Владимир', 'Оксана', 'Виктория', 'Диана', 'Алиса', 'Кирилл'];

const createPost = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  desc: getRandomArrayElem(DESC),
  likes: getRandomNumber(15, 200),
  comments: [{
    id: i,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElem(MESSAGE),
    name: getRandomArrayElem(NAME),
  },{
    id: i,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElem(MESSAGE),
    name: getRandomArrayElem(NAME),
  }],
});

function createArrPhotos(numPosts) {
  const posts = [];
  for (let index = 1; index <= numPosts; index++) {
    const newObj = createPost(index);
    posts.push(newObj);
  }
  return posts;
}

export {createArrPhotos};
