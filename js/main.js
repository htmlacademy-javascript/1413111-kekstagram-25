// https://myrusakov.ru/js-random-numbers.html
function getRandomNumber(min, max) {
  if (min >= 0 && max > 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'числа не могут быть отрицательными и max должен быть больше min';
}
const result = getRandomNumber(1, 3);
console.log(result);

function checkString(checkingStr, max) {
  if (checkingStr.length < max) {
    return true;
  }
  return false;
}

const lenghtSrt = checkString('привут', 140);
console.log(lenghtSrt);
