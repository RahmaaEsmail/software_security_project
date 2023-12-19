const keyOfAlgorithm = document.querySelector("input");
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
let text;

function handleEncrypt(plainText, key) {
  plainText = plainText.toLowerCase();
  key = key.toLowerCase();
  let encryptedMessage = "";
  let keyIndex = 0;

  for (let i = 0; i < plainText.length; i++) {
    let char = plainText[i];
    if (char.match(/[a-z]/)) {
      const keyPosition = key.charCodeAt(keyIndex % key.length) - 97;
      const charPosition = plainText.charCodeAt(i) - 97;
      const equation = ((keyPosition + charPosition) % 26) + 97;
      const encryptedChar = String.fromCharCode(equation);
      encryptedMessage += encryptedChar;
      keyIndex++;
    } else {
      encryptedMessage += char;
    }
  }
  text = encryptedMessage;
  return encryptedMessage;
}

function handleDecrypt(cipherTxt, key) {
  cipherTxt = cipherTxt.toLowerCase();
  key = key.toLowerCase();
  let decryptedMessage = "";
  let keyIndex = 0;

  for (let i = 0; i < cipherTxt.length; i++) {
    let char = cipherTxt[i];
    if (char.match(/[a-z]/)) {
      const keyPosition = key.charCodeAt(keyIndex % key.length) - 97;
      const charPosition = cipherTxt.charCodeAt(i) - 97;
      let cipher = charPosition - keyPosition;
      while (cipher < 0) {
        cipher = cipher + 26;
      }
      const equation = (cipher % 26) + 97;
      const encryptedChar = String.fromCharCode(equation);
      decryptedMessage += encryptedChar;
      keyIndex++;
    } else {
      decryptedMessage += char;
    }
  }
  return decryptedMessage;
}

encryptBtn.addEventListener("click", () => {
  const message = document.querySelector("textarea");
  const encryptedText = handleEncrypt(message.value, keyOfAlgorithm.value);
  console.log("Enrypted Message : ", encryptedText);
});

decryptBtn.addEventListener("click", () => {
  const decryptedText = handleDecrypt(text, keyOfAlgorithm.value);
  console.log("Decrypted Message : ", decryptedText);
});
