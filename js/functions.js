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
