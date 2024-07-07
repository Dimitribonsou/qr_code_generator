//recuperer les differents bouton
let codeValue = document.getElementById("codeqr");
const btnNewCode = document.getElementById("btncode");
const btnValider = document.getElementById("btnsave");
const messageError = document.getElementById("sms_qrcode");
//recuperer l'imgage pour le qrcode
const imageQrcode = document.getElementById("img_qrCode");
//recuperer le la balise tbody qui contiendra tout les enregistrement pour afficher les codes qr
const qrcodeContent = document.getElementById("liste_qrcodecontent");

// tableau permettant de stocker le code Qr
let TabQrCode = [];

//********************REDACTION DES FONCTIONS POUR LE TRAITEMENT ************ */
//redaction de la  fonction de generation de code
function codeQrGenerator() {
  const title = "DIMIDEV";
  //creation des elements de gestion de date pour la construction du code qr
  const datestring = new Date();
  const jour = datestring.getDate();
  const mois = datestring.getMonth();
  const year = datestring.getFullYear().toString();
  const annee = year.substring(2, 4);
  //creation du tabeleau de caractere
  const TabChar = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  //   generer un nombre aleatoire pour recuperer un lettre de l'alphabet francais
  let motselectionner = "";
  for (let i = 0; i < 2; i++) {
    const numero = Math.random() * 25;
    const numeroChar = numero.toFixed();
    motselectionner = motselectionner + TabChar[numeroChar];
  }
  //conversion du caractere choisie en majuscule
  const caractere = motselectionner.toUpperCase();
  //gener un nombre aleatoire
  const nbgenerer = Math.random(10) * 100;
  const nbalertoire = nbgenerer.toFixed();
  //construction du code QR
  let codeqrValue = title + nbalertoire + caractere + annee + mois + jour;
  //retourner le code qr generer
  return codeqrValue;
}

// function permettant d'enregistrer le code qr
function SaveQrCode(codeqr) {
  // creer un tableau permettant d'enregistrer le code qr

  const codegenerer = codeqr;
  TabQrCode.push(codegenerer);
  AfficheQrCode();
}
// function permettant de verifier si un code qr existe avant d'enregistrer
function verifyExistCodeQr(codeqr) {
  let exist = false;
  const codetest = codeqr;
  //verifier si se code Qr est deja utilise
  TabQrCode.forEach((code) => {
    if (codetest == code) {
      exist = true;
    }
  });
  return exist;
}

// function permettant d'effectuer les traitements

function TraitementCodeQr() {
  // recuperer le code qr qui a ete generer
  const codeqrtextvalue = codeValue.value;
  //verifier si ce code n'existe pas avant de l'ajouter au tableau

  if (verifyExistCodeQr(codeqrtextvalue)) {
    //afficher le message d'erreur pour informer l'utisateur
    messageError.style.color = "red";
    messageError.style.fontWeight = "bold";
    messageError.style.fontSize = "16px";
    messageError.textContent = "Se code QR existe deja veuillez le changer";
  } else {
    // enregistrer le code Qr generer
    SaveQrCode(codeqrtextvalue);
    //afficher le message de confirmation
    messageError.style.color = "blue";
    messageError.style.fontWeight = "bold";
    messageError.style.fontSize = "18px";
    messageError.textContent =
      "Felicitation vous venez d'enregistrer un nouveau code Qr 😊😍👍";
    resetImage();
  }
  //   afficher  la liste actualiser de de code qr
}
//cette fonction permet de renitialiser le message envoye
function resetMessage() {
  messageError.textContent = "";
}
//cette fonction permet de renitialiser l'image
function resetImage() {
  imageQrcode.src = "";
}
// function permettant d'afficher les codes qr enregistrer
function AfficheQrCode() {
  //parcourir le tableau pour afficher la liste des code qr
  const qrcodeitems = document.createElement("div");
  let i = 1;
  TabQrCode.forEach((code) => {
    qrcodeitems.innerHTML = ` 
        <div class="tr" id="${i}">
            <div class="td">${i}</div>
             <div class="td">${code}</div>
        </div>        
        `;
    qrcodeContent.appendChild(qrcodeitems);
    i++;
  });
}

//***********ajouter les actions sur les differents boutons**************
codeValue.innerText = "bonjour";
//bouton permettant de generer un nouveau codeqr
btnNewCode.addEventListener("click", () => {
  const code = codeQrGenerator().toString();
  imageQrcode.src = "./qrcode.png";
  codeValue.value = code;
  resetMessage();
});

//bouton permettant de generer valider le code qr
btnValider.addEventListener("click", TraitementCodeQr);
