const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const KeyOfAlgorith = document.querySelector("input");
const message = document.querySelector("textarea");


function handleEncrypt() {
  const plainTxt = message.value;
  const keyValue = Number(KeyOfAlgorith.value);
  let encryptedMessage = "";

  for (let i = 0; i < plainTxt.length; i++) {
    let char = plainTxt[i];
    if (char.match(/[a-zA-Z]/)) {
      const charAsciiCode = plainTxt.charCodeAt(i);
      const offset = char === char.toUpperCase() ? 65 : 97;
      const charPosition = charAsciiCode - offset;
      char = String.fromCharCode(((charPosition + keyValue) % 26) + offset);
    }

    encryptedMessage += char;
  }
  message.value = encryptedMessage;
}

function handleDecrypt() {
  const cipherTxt = message.value;
  const keyValue = Number(KeyOfAlgorith.value);
  let decryptedMessage = "";

  for (let i = 0; i < cipherTxt.length; i++) {
    let char = cipherTxt[i];
    if (char.match(/[a-zA-Z]/)) {
      const charAsciiCode = cipherTxt.charCodeAt(i);
      const offset = char === char.toUpperCase() ? 65 : 97;
      const charPosition = charAsciiCode - offset;
      const cipher =  (charPosition - keyValue) < 0 ? ((charPosition - keyValue) + 26) : (charPosition - keyValue)
      char = String.fromCharCode((cipher % 26) + offset);
    }

    decryptedMessage += char;
  }
  message.value = decryptedMessage;
}

encryptBtn.addEventListener("click", handleEncrypt);
decryptBtn.addEventListener("click",handleDecrypt);
