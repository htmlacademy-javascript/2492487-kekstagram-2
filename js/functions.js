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

const meetingOvertime = (workStart, workEnd, meetingStart, meetingDuration) => {

  const timeArrayinMinutes = [workStart, workEnd, meetingStart].map((value) => value.split(':')[0] * 60 + Number(value.split(':')[1]));

  return !(timeArrayinMinutes[2] + meetingDuration > timeArrayinMinutes[1] || timeArrayinMinutes[2] < timeArrayinMinutes[0]);
};

  console.log(meetingOvertime('08:00', '17:30', '14:00', 90)); // true
  console.log(meetingOvertime('8:0', '10:0', '8:0', 120));     // true
  console.log(meetingOvertime('08:00', '14:30', '14:00', 90)); // false
  console.log(meetingOvertime('14:00', '17:30', '08:0', 90));  // false
  console.log(meetingOvertime('8:00', '17:30', '08:00', 900)); // false
