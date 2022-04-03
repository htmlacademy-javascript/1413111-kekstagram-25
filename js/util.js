const ALERT_SHOW_TIME = 5000;

// https://myrusakov.ru/js-random-numbers.html
function getRandomNumber(min, max) {
  if (min >= 0 && max > 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return 'числа не могут быть отрицательными и max должен быть больше min';
}

const getRandomArrayElem = (elem) => elem[getRandomNumber(0, elem.length - 1)];

function uniq(a) {
  const seen = {};
  // eslint-disable-next-line no-prototype-builtins
  return a.filter((item) => seen.hasOwnProperty(item.trim()) ? false : (seen[item.trim()] = true));
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  uniq,
  isEscapeKey,
  showAlert,
  debounce
};
