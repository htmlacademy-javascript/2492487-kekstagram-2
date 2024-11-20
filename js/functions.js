const checkStringLength = (string, maxLength) => {
  const result = (string.length <= maxLength);
  return result;
};

const checkPalindrome = (string) => {
  string = string.replaceAll(' ', '');
  let reverseString = '';
  for (let i = string.length - 1; i > -1; i--) {
    reverseString += string[i];
  }
  return (string.toLowerCase() === reverseString.toLowerCase());
};

const getNumber = (string) => {
  if (typeof string === 'number'){
    string = String(string);
  }
  string = string.replaceAll(' ', '');
  let numberString = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string[i], 10);
    if (!Number.isNaN(number)) {
      numberString += number;
    }
  }
  return parseInt(numberString, 10);
};
