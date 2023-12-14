const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const KeyOfAlgorith = document.querySelector("input");
const message = document.querySelector("textarea");

function handleEncrypt() {
  const plainTxt = message.value;
  const key = Number(KeyOfAlgorith.value);
  let encryptedMessage = "";

  for (let i = 0; i < plainTxt.length; i++) {
    let char = plainTxt[i];
    if (char.match(/[a-zA-Z]/)) {
      const charAsciiCode = plainTxt.charCodeAt(i);
      const offset = char === char.toUpperCase() ? 65 : 97;
      const charPosition = charAsciiCode - offset;
      char = String.fromCharCode(((charPosition + key) % 26) + offset);
    }

    encryptedMessage += char;
  }
  message.value = encryptedMessage;
}

function handleDecrypt(encryptedMessage) {
  let decryptedMessage = "";
  const key = Number(KeyOfAlgorith.value);

  for (let i = 0; i < encryptedMessage.length; i++) {
    let char = encryptedMessage[i];
    if (char.match(/[a-zA-Z]/)) {
      const charAsciiCode = encryptedMessage.charCodeAt(i);
      const offset = char === char.toUpperCase() ? 65 : 97;
      const charPosition = charAsciiCode - offset;
      char = String.fromCharCode(((charPosition - key) % 26) + offset);
    }

    decryptedMessage += char;
  }
  message.value = decryptedMessage;
}

encryptBtn.addEventListener("click", handleEncrypt);
decryptBtn.addEventListener("click", handleDecrypt);
