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

const getRandomArrayElem = (elem) => elem[getRandomNumber(0, elem.length - 1)];

export {getRandomArrayElem, getRandomNumber};
