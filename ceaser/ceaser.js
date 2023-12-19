const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
let text;

function handleEncrypt(plainTxt, keyValue) {
  plainTxt = plainTxt.toLowerCase();
  let result = "";
  for (let i = 0; i < plainTxt.length; i++) {
    let char = plainTxt[i];
    let code = plainTxt.charCodeAt(i);
    if (char.match(/[a-z]/)) {
      const encryptedCode = ((code - 97 + keyValue) % 26) + 97;
      const encryptedChar = String.fromCharCode(encryptedCode);
      result += encryptedChar;
    } else {
      result += char;
    }
  }
  text = result;
  return result;
}

function handleDecrypt(cipherTxt, keyValue) {
  cipherTxt = cipherTxt.toLowerCase();
  let result = "";
  for (let i = 0; i < cipherTxt.length; i++) {
    let char = cipherTxt[i];
    const charAsciiCode = cipherTxt.charCodeAt(i);
    if (char.match(/[a-z]/)) {
      let cipher = charAsciiCode - 97 - keyValue;
      while (cipher < 0) {
        cipher += 26;
      }
      const encryptedCode = (cipher % 26) + 97;
      const encryptedChar = String.fromCharCode(encryptedCode);
      result += encryptedChar;
    } else {
      result += char;
    }
  }
  return result;
}

encryptBtn.addEventListener("click", () => {
  const key = document.getElementById("key");
  const message = document.querySelector("textarea");
  const encryptedText = handleEncrypt(message.value, Number(key.value));
  console.log("Encrypted Message : ", encryptedText);
});

decryptBtn.addEventListener("click", () => {
  const key = document.getElementById("key");
  const decryptedMessage = handleDecrypt(text, Number(key.value));
  console.log("Decrypted Message : ", decryptedMessage);
});
