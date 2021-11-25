const select = document.getElementById('encryption-select'); // encryption selector
const shift = document.getElementById('encryption-shift-amount'); // shift amount input
const input = document.getElementById('encryption-input'); // text input area
const output = document.getElementById('encryption-output'); // text output area

const caesarCharSet = ["abcdefghijklmnopqrstuvwxyz1234567890"]; // character sets for caesar cipher
const myCharSet = ["qwertyuiop","asdfghjkl","zxcvbnm", "1234567890"]; // character sets for my cipher
const A = "A".charCodeAt(0); // value of char 'A'
const Z = "Z".charCodeAt(0); // value of char 'Z'

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
  let cipher;

  switch(selectedMethod) {
    case encryptionMethods.ceasarCipher:
      cipher = shiftCipher(caesarCharSet, direction);
      break;

    case encryptionMethods.myCipher:
      cipher = shiftCipher(myCharSet, direction);
      break;
  }

  output.value = cipher;
}

/**
 * Find the charSet and index of input char
 * 
 * @param {string[]} charSets - array of charSets
 * @param {char} char - queried character
 * @returns {number[]} index of charSet and index of char
 */
function getCharSetIndex(charSets, char) {
  let isUpper = false;
  let val = char.charCodeAt(0);

  if (A <= val && val <= Z) {
    char = char.toLowerCase();
    isUpper = true;
  }
  

  for (let i = 0; i < charSets.length; i++) {
    if (charSets[i].includes(char)) {
      return [i, charSets[i].indexOf(char), isUpper];
    }
  }

  return [-1, -1, isUpper];
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
function shiftChar(charSets, charSetIndex, charIndex, amount, isUpper) {
  let charSet = charSets[charSetIndex];
  let newCharIndex = (charIndex + amount) % charSet.length;

  if (newCharIndex < 0) {
    newCharIndex += charSet.length;
  }

  let newChar = charSet[newCharIndex];

  if (isUpper) {
    newChar = newChar.toUpperCase();
  }

  return newChar;
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
    const [charSetIndex, charIndex, isUpper] = getCharSetIndex(charSets, char);
    
    if (charSetIndex != -1) {
      arr[idx] = shiftChar(charSets, charSetIndex, charIndex, (direction ? shiftAmount : -shiftAmount), isUpper);
    }
  });

  return arr.join('');
}
