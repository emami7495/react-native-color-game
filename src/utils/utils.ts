import APP_CONSTANTS from '../constants/app';

export function getTime(inputTime: number) {
  let result = '';
  const minute = Math.floor(inputTime / 60);
  const second = inputTime % 60;
  if ((`${minute}`).length === 1) {
    result += `0${minute}:`;
  } else {
    result += `${minute}:`;
  }
  if ((`${second}`).length === 1) {
    result += `0${second}`;
  } else {
    result += second;
  }
  return result;
}

export function gameSort() {
  switch (Math.floor(Math.random() * 3)) {
    case 0:
      return -1;
    case 1:
      return 0;
    case 2:
      return 1;
    default:
      break;
  } return 0;
}

export function createColorArray(squareSideSize: number) {
  const count = ((squareSideSize * squareSideSize) / 2);
  const halfArray = APP_CONSTANTS.randomColor({
    luminosity: 'light',
    format: 'rgba',
    // hue: 'blue',
    alpha: 1,
    count,
  });
  const finalArray = halfArray.concat(halfArray);
  finalArray.sort(gameSort);
  return finalArray;
}

export const emptyItem = {
  num: -1, selected: false, color: '#ffffff', hidden: false,
};
