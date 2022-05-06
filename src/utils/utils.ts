import APP_CONSTANTS from '../constants/app';
import i18n from '../translations/i18n';

export function getTime(inputTime: number) {
  let result = '';
  const minute = Math.floor(inputTime / 60);
  const second = inputTime % 60;
  if (i18n.language === 'fa') {
    if ((`${second}`).length === 1) {
      result += `0${second} : `;
    } else {
      result += `${second} : `;
    }
    if ((`${minute}`).length === 1) {
      result += `0${minute}`;
    } else {
      result += `${minute}`;
    }
  } else {
    if ((`${minute}`).length === 1) {
      result += `0${minute} : `;
    } else {
      result += `${minute} : `;
    }
    if ((`${second}`).length === 1) {
      result += `0${second}`;
    } else {
      result += second;
    }
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

export function changeNumToFa(text:string) {
  if (!text || i18n.language !== 'fa') { return text; }
  let finalText = text;
  const find0 = '0';
  const find1 = '1';
  const find2 = '2';
  const find3 = '3';
  const find4 = '4';
  const find5 = '5';
  const find6 = '6';
  const find7 = '7';
  const find8 = '8';
  const find9 = '9';
  const r0 = new RegExp(find0, 'g');
  const r1 = new RegExp(find1, 'g');
  const r2 = new RegExp(find2, 'g');
  const r3 = new RegExp(find3, 'g');
  const r4 = new RegExp(find4, 'g');
  const r5 = new RegExp(find5, 'g');
  const r6 = new RegExp(find6, 'g');
  const r7 = new RegExp(find7, 'g');
  const r8 = new RegExp(find8, 'g');
  const r9 = new RegExp(find9, 'g');
  finalText = finalText.replace(r0, '۰');
  finalText = finalText.replace(r1, '۱');
  finalText = finalText.replace(r2, '۲');
  finalText = finalText.replace(r3, '۳');
  finalText = finalText.replace(r4, '۴');
  finalText = finalText.replace(r5, '۵');
  finalText = finalText.replace(r6, '۶');
  finalText = finalText.replace(r7, '۷');
  finalText = finalText.replace(r8, '۸');
  finalText = finalText.replace(r9, '۹');
  return finalText;
}
