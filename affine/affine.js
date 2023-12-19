const message = document.querySelector("textarea");
const fisrtKey = document.querySelector("#key-1");
const secondKey = document.querySelector("#key-2");
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
let PT;

function gcd(a, b) {
  if (b !== 0) {
    return gcd(b, a % b);
  } else {
    return Math.abs(a);
  }
}

function handleEncrypt() {
  const plainText = message.value;
  const a = Number(fisrtKey.value);
  const b = Number(secondKey.value);

  if (gcd(a, 26) === 1) {
    let ciphertext = "";

    for (let i = 0; i < plainText.length; i++) {
      let ch = plainText.charAt(i);

      if (/[a-zA-Z]/.test(ch)) {
        let encryptedChar = String.fromCharCode(
          ((a * (ch.toUpperCase().charCodeAt(0) - "A".charCodeAt(0)) + b) %
            26) +
            "A".charCodeAt(0)
        );
        ciphertext += encryptedChar;
      } else {
        ciphertext += ch;
      }
    }
    PT = ciphertext;
    return ciphertext;
  } else {
    return "";
  }
}

function handleDecrypt(ciphertext, a, b) {
  if (gcd(a, 26) === 1) {
    let plaintext = "";

    let aInverse = findModularInverse(a);
    for (let i = 0; i < ciphertext.length; i++) {
      let ch = ciphertext.charAt(i);

      if (/[a-zA-Z]/.test(ch)) {
        let decryptedChar = String.fromCharCode(
          ((aInverse *
            (ch.toUpperCase().charCodeAt(0) - "A".charCodeAt(0) - b + 26)) %
            26) +
            "A".charCodeAt(0)
        );
        plaintext += decryptedChar;
      } else {
        plaintext += ch;
      }
    }
    return plaintext;
  } else {
    return "";
  }
}

function findModularInverse(a) {
  for (let i = 0; i < 26; i++) {
    if ((a * i) % 26 === 1) {
      return i;
    }
  }
  return -1; // No modular inverse exists
}

encryptBtn.addEventListener("click", () => {
  const encryptedText = handleEncrypt();
  console.log("Encrypted Message : ", encryptedText);
});

decryptBtn.addEventListener("click", () => {
  const encryptedText = PT;
  const a = Number(fisrtKey.value);
  const b = Number(secondKey.value);

  const decryptedText = handleDecrypt(encryptedText, a, b);
  console.log("Decrypted Message : ", decryptedText);
});
