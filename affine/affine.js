const message = document.querySelector("textarea");
const fisrtKey = document.querySelector("#key-1");
const secondKey = document.querySelector("#key-2");
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
let SIZE_OF_ALPHABET = 26;

function ModularInverse(a, n) {
  for (let i = 0; i < n; i++) {
    if ((Number(a) * i) % n === 1) {
      return i;
    }
  }
  return 1;
}

const gcd = (a, n) => (n == 0 ? a : gcd(n, a % n));

const gcdResult = gcd(Number(fisrtKey.value) , SIZE_OF_ALPHABET)

function handleEncrpt() {
  let plainText = message.value;
  let encryptedMessage = "";

//   if (gcdResult === 1) {
    for (let i = 0; i < plainText.length; i++) {
      let char = plainText[i];
      if (char.match(/[a-zA-Z]/)) {
        const charAsciiCode = plainText.charCodeAt(i);
        const offset = char === char.toUpperCase() ? 65 : 97;
        const charPosition = charAsciiCode - offset;

        if (plainText.match(/[a-z]/) && plainText.match(/[A-Z]/)) {
          char = String.fromCharCode(
            ((Number(fisrtKey.value) * charPosition + Number(secondKey.value)) %
              SIZE_OF_ALPHABET) +
              offset
          );
        } else {
          char = String.fromCharCode(
            ((Number(fisrtKey.value) * charPosition + Number(secondKey.value)) %
              SIZE_OF_ALPHABET) +
              offset
          );
        }
      }
      encryptedMessage += char;
    }
    message.value = encryptedMessage;
//   }
  return encryptedMessage;
}

function handleDecrypt() {
  let decryptedMessage = "";
  const cipherTxt = message.value;
  const aInverse = ModularInverse(Number(fisrtKey.value), SIZE_OF_ALPHABET);
  for (let i = 0; i < cipherTxt.length; i++) {
    let char = cipherTxt[i];
    if (char.match(/[a-zA-Z]/)) {
      const charAsciiCode = cipherTxt.charCodeAt(i);
      const offset = char === char.toUpperCase() ? 65 : 97;
      const charPosition = charAsciiCode - offset;

      char = String.fromCharCode(
        ((aInverse *
          (charPosition - Number(secondKey.value) + SIZE_OF_ALPHABET)) %
          SIZE_OF_ALPHABET) +
          offset
      );
    }
    decryptedMessage += char;
  }
  message.value = decryptedMessage;
  return decryptedMessage;
}

encryptBtn.addEventListener("click", handleEncrpt);
decryptBtn.addEventListener("click", handleDecrypt);
