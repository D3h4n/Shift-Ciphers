const select = document.getElementById('encryption-select'); // encryption selector
const shift = document.getElementById('encryption-shift-amount'); // shift amount input
const input = document.getElementById('encryption-input'); // text input area
const output = document.getElementById('encryption-output'); // text output area

const caesarCharSet = ["abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; // character sets for caesar cipher
const myCharSet = ["qwertyuiop","asdfghjkl","zxcvbnm", "QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"]; // character sets for my cipher

let selectedMethod = select.options[select.selectedIndex].value; // enumerated value of character set
let shiftAmount = Number.parseInt(shift.value); // amount to shift character by

// enumerated list of encryption methods
let encryptionMethods = {
  ceasarCipher: "1",
  myCipher: "2"
}

/**
 * Set the selected method
 */
function handleSelect() {
  selectedMethod = select.options[select.selectedIndex].value;
}


/**
 * Set the shift amount
 */
function setShiftAmount() {
  shiftAmount = Number.parseInt(shift.value);
}

/**
 * Clear text areas
 */
function handleClear() {
  input.value = "";
  output.value = "";
}


/**
 * Handle for encryption / decryption
 * 
 * @param {bool} direction - direction of encryption (encrypt / decrypt)
 */
function handleEncrypt(direction) {
  switch(selectedMethod) {
    case encryptionMethods.ceasarCipher:
      shiftCipher(caesarCharSet, direction);
      break;

    case encryptionMethods.myCipher:
      shiftCipher(myCharSet, direction);
      break;
  }
}


/**
 * Find the charSet and index of input char
 * 
 * @param {string[]} charSets - array of charSets
 * @param {char} char - queried character
 * @returns {number[]} index of charSet and index of char
 */
function getCharSetIndex(charSets, char) {
  for (let i = 0; i < charSets.length; i++) {
    if (charSets[i].includes(char)) {
      return [i, charSets[i].indexOf(char)];
    }
  }

  return [-1, -1];
}

/**
 * Find shifted chracter
 * 
 * @param {string[]} charSets - array of character sets
 * @param {number} charSetIndex - index of character set
 * @param {number} charIndex - index of character
 * @param {number} amount - amount to shift by
 * @returns {char} shifted char
 */
function shiftChar(charSets, charSetIndex, charIndex, amount) {
  let charSet = charSets[charSetIndex];
  let newCharIndex = (charIndex + amount) % charSet.length;

  if (newCharIndex < 0) {
    newCharIndex += charSet.length;
  }

  return charSet.charAt(newCharIndex);
}

/**
 * Execute shift cipher and place output in output text area
 * 
 * @param {string[]} charSets - array of character sets 
 * @param {bool} direction - direction of encryption (encrypt / decrypt)
 */
function shiftCipher(charSets, direction) {
  const arr = input.value.split('');

  arr.forEach((char, idx) => {
    const [charSetIndex, charIndex] = getCharSetIndex(charSets, char);
    
    if (charSetIndex != -1) {
      arr[idx] = shiftChar(charSets, charSetIndex, charIndex, (direction ? shiftAmount : -shiftAmount));
    }
  });

  output.value = arr.join('');
}
