/*проверка строки-палиндрома */
function checkPolindrom(str) {
  if (
    str.toUpperCase().replaceAll(' ', '') ===
    str.toUpperCase().replaceAll(' ', '').split('').reverse().join('')
  ) {
    return true;
  }
  return false;
}
checkPolindrom('топот'); // true

checkPolindrom('ДовОд'); // true

checkPolindrom('Кекс'); // false
checkPolindrom('Лёша на полке клопа нашёл '); // true
checkPolindrom('GGGk');

/*Извлечение из строки цифр */
function extractNumbersFromString(str) {
  let result = '';
  const fromNumToString = str.toString();
  for (let i = 0; i <= fromNumToString.length; i++) {
    if (fromNumToString[i] >= 0 && fromNumToString[i] <= 9) {
      result += fromNumToString[i];
    }
  }
  return parseInt(result.replaceAll(' ', ''), 10);
}
extractNumbersFromString('2023 год'); // 2023
extractNumbersFromString('ECMAScript 2022'); // 2022
extractNumbersFromString('1 кефир, 0.5 батона'); // 105
extractNumbersFromString('агент 007'); // 7
extractNumbersFromString('а я томат'); // NaN
extractNumbersFromString(2023); // 2023
extractNumbersFromString(-1); // 1
extractNumbersFromString(1.5); // 15
/* */

function prependString(originalStr, strLength, additionalStr) {
  let result = originalStr;
  if (originalStr.length > strLength) {
    return originalStr;
  }

  while (result.length < strLength) {
    if (result.length + additionalStr.length < strLength) {
      result = additionalStr + result;
    } else {
      result = additionalStr.substring(0, strLength - result.length) + result;
    }
  }

  return result;
}

prependString('1', 2, '0'); // '01'

// Добавочный символ использован три раза
prependString('1', 4, '0'); // '0001'

// Добавочные символы обрезаны с конца
prependString('q', 4, 'werty'); // 'werq'

// Добавочные символы использованы полтора раза
prependString('q', 4, 'we'); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
prependString('qwerty', 4, '0'); // 'qwerty'

/* */

/* */
function validatorStr(str, strLength) {
  const result = str.length <= strLength;
  return result;
}

// Cтрока короче 20 символов
validatorStr('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validatorStr('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validatorStr('проверяемая строка', 10); // false
