// https://myrusakov.ru/js-random-numbers.html
function getRandomNumber(min, max) {
  if (min >= 0 && max > 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'числа не могут быть отрицательными и max должен быть больше min';
}

function checkString(checkingStr, max) {
  return checkingStr.length < max;
}

const DESC = ['Это я в Москве у мавзолея Ленина.', 'Это на Тверской у чужого Мерина.', 'Это я на пляже летом в Таганроге.'];
const MESSAGE = ['Всё отлично!', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.'];
const NAME = ['Игорь', 'Владимир', 'Оксана', 'Виктория', 'Диана', 'Алиса', 'Кирилл'];

const getRandomArrayElem = (elem) => elem[getRandomNumber(0, elem.length - 1)];

const createObj = (i) => ({
  id: i,
  url: `photos/${i}.jpg`,
  desc: getRandomArrayElem(DESC),
  likes: getRandomNumber(15, 200),
  comments: [{
    id: i,
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: getRandomArrayElem(MESSAGE),
    name: getRandomArrayElem(NAME),
  }],
});

const limitationObj =[]
for (let index = 1; index < 26; index++) {
  const newObj = createObj(index);
  limitationObj.push(newObj);
}

