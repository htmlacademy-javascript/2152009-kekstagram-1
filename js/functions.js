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
function extractingNumbers(str) {
  let result = '';
  const fromNumToString = str.toString();
  for (let i = 0; i <= fromNumToString.length; i++) {
    if (fromNumToString[i] >= 0 && fromNumToString[i] <= 9) {
      result += fromNumToString[i];
    }
  }
  return parseInt(result.replaceAll(' ', ''), 10);
}
extractingNumbers('2023 год'); // 2023
extractingNumbers('ECMAScript 2022'); // 2022
extractingNumbers('1 кефир, 0.5 батона'); // 105
extractingNumbers('агент 007'); // 7
extractingNumbers('а я томат'); // NaN
extractingNumbers(2023); // 2023
extractingNumbers(-1); // 1
extractingNumbers(1.5); // 15
/* */

function additionalCharactersFun(originalStr, strLength, additionalStr) {
  let result = originalStr;
  if (originalStr.length > strLength) {
    return console.log(originalStr);
  }

  while (result.length < strLength) {
    if (result.length + additionalStr.length < strLength) {
      result = additionalStr + result;
    } else {
      result = additionalStr.substring(0, strLength - result.length) + result;
    }
  }

  return console.log(result);
}

// Добавочный символ использован один раз
additionalCharactersFun('1', 2, '0'); // '01'

// Добавочный символ использован три раза
additionalCharactersFun('1', 4, '0'); // '0001'

// Добавочные символы обрезаны с конца
additionalCharactersFun('q', 4, 'werty'); // 'werq'

// Добавочные символы использованы полтора раза
additionalCharactersFun('q', 4, 'we'); // 'wweq'

// Добавочные символы не использованы, исходная строка не изменена
additionalCharactersFun('qwerty', 4, '0'); // 'qwerty'

/* */

/* */
function validatorStr(str, strLength) {
  const result = str.length <= strLength;
  return console.log(result);
}

// Cтрока короче 20 символов
validatorStr('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
validatorStr('проверяемая строка', 18); // true
// Строка длиннее 10 символов
validatorStr('проверяемая строка', 10); // false
