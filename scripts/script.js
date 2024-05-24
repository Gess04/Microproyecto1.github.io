const wordlist = [
  {
    word:"guitar",
    hint:"A musical instrument with strings."
  },
  {
    word:"oxygen",
    hint:"A colorless, odorless gas essential for life."
  },
  {
    word:"mountain",
    hint:"A large natural elevation of the Earth`s surface."
  }
];

const keyboardDiv = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".letter_display");

/*Generar palabras aleatoriamente por medio de una funcion flecha*/
const getRandomWord = () => {
  const {word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(word,hint);
  document.querySelector(".hint").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(() =>'<li class="letter"></li>').join("");
}

const initGame = (button, clickedLetter) => {
  console.log(button,clickedLetter);
}

/*Bucle para crear los botones del teclado del juego de maneta dinamica */
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button")
  button.innerText = String.fromCharCode(i);  
  keyboardDiv.appendChild(button);
  button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();