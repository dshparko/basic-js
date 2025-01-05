const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirectMode = true) {
    this.isDirectMode = isDirectMode;
  }

  cipher(message, key, mode = "encrypt") {
    this.checkParameters(message, key);

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    let currentIndex = 0;

    for (const char of message) {
      if (this.isLetter(char)) {
        const codeInMessage = char.charCodeAt();
        const codeInKey = key[currentIndex % key.length].charCodeAt();

        let charCode;
        if (mode === "encrypt") {
          charCode = (codeInMessage + codeInKey) % 26;
        } else if (mode === "decrypt") {
          charCode = (codeInMessage - codeInKey + 26) % 26;
        }

        result += String.fromCharCode(charCode + 65);
        currentIndex += 1;
      } else {
        result += char;
      }
    }

    return this.isDirectMode ? result : result.split("").reverse().join("");
  }

  encrypt(message, key) {
    return this.cipher(message, key, "encrypt");
  }

  decrypt(encryptedMessage, key) {
    return this.cipher(encryptedMessage, key, "decrypt");
  }

  checkParameters(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }
  }

  isLetter(char) {
    const charCode = char.toUpperCase().charCodeAt(0);
    return charCode >= 65 && charCode <= 90;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
