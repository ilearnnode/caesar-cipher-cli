let alphabet = '';
for (let i = 97; i <= 122; i++) {
  alphabet += String.fromCharCode(i);
}

// TODO: check negative shift
function transformChar(initial, index, shift, encode) {
  const inputChar = initial[index];
  const inputLowerChar = inputChar.toLowerCase();
  const inputIndex = alphabet.indexOf(inputLowerChar);
  if (inputIndex === -1) {
    return inputChar;
  }

  const outputShiftedIndex = inputIndex + (encode ? shift : -shift);
  const outputIndex = getOffsetIndex(outputShiftedIndex);
  const outputChar = alphabet[outputIndex];

  return inputChar === inputLowerChar ? outputChar : outputChar.toUpperCase();
}

function getOffsetIndex(index) {
  if (index < 0) {
    let offset = index % alphabet.length;
    if (offset === 0) {
      return 0;
    }

    return alphabet.length + offset;
  }

  return index % alphabet.length;
}

module.exports = transformChar;
