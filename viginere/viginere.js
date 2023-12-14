const message = document.querySelector("textarea");
const keyOfAlgorithm = document.querySelector("input");
const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");

function handleEncrypt() {
    const plainTxt = message.value;
    const keyValue = keyOfAlgorithm.value;
    let encryptedMessage = "";
    let keyIndex = 0;

    for(let i=0; i<plainTxt.length;i++) {
        let char = plainTxt[i];

        if(char.match(/[a-zA-Z]/)) {
            const charAsciiCode = plainTxt.charCodeAt(i);
            const txtOffset = (char === char.toUpperCase()) ? 65 : 97;
            const charPosition = charAsciiCode - txtOffset;
            
            const keyChar = keyValue.charAt(keyIndex % keyValue.length) // or  keyValue[keyIndex % keyValue.length]
            const keyAsciiCode = keyValue.charCodeAt(i)
            const keyOffset = (keyChar === keyChar.toUpperCase()) ? 65 : 97;
            const keyPosition = keyAsciiCode - keyOffset;
            char = String.fromCharCode(((charPosition + keyPosition) % 26) + txtOffset )

            keyIndex ++;
        }
        encryptedMessage += char;
    }

    message.value = encryptedMessage
}


function handleDecrypt() {
    const cipherTxt = message.value;
    const keyValue = keyOfAlgorithm.value;
    let decryptedMessage = "";
    let keyIndex = 0;

    for(let i=0; i<cipherTxt.length;i++) {
        let char = cipherTxt[i];

        if(char.match(/[a-zA-Z]/)) {
            const charAsciiCode = cipherTxt.charCodeAt(i);
            const txtOffset = (char === char.toUpperCase()) ? 65 : 97;
            const charPosition = charAsciiCode - txtOffset;
            
            const keyChar = keyValue.charAt(keyIndex % keyValue.length) // or  keyValue[keyIndex % keyValue.length]
            const keyAsciiCode = keyValue.charCodeAt(i)
            const keyOffset = (keyChar === keyChar.toUpperCase()) ? 65 : 97;
            const keyPosition = keyAsciiCode - keyOffset;
            const cipher =  (charPosition - keyPosition) < 0 ? ((charPosition - keyPosition) + 26) : (charPosition - keyPosition)
            char = String.fromCharCode((cipher % 26) + txtOffset )

            keyIndex ++;
        }
        decryptedMessage += char;
    }

    message.value = decryptedMessage
}



encryptBtn.addEventListener("click", handleEncrypt);
decryptBtn.addEventListener("click",handleDecrypt)