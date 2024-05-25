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
const hangmanImage = document.querySelector(".hangman_box img");
const guessesText = document.querySelector(".guesses");
const wordDisplay = document.querySelector(".letter_display");
let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;

/*Generar palabras aleatoriamente por medio de una funcion flecha*/
const getRandomWord = () => {
  const {word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(word,hint);
  currentWord = word;
  document.querySelector(".hint").innerText = hint;
  wordDisplay.innerHTML = word.split("").map(() =>'<li class="letter"></li>').join("");
}

/*Funcion flecha para inicializar las letras del teclado */
const initGame = (button, clickedLetter) => {
  if(currentWord.includes(clickedLetter)){
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guesses");
      }
    });
    console.log(clickedLetter,"Letra correcta!");
  } else {
    console.log(clickedLetter,"Letra incorrecta!");
    wrongGuessCount++;
    hangmanImage.src = `imagenes/hangman-${wrongGuessCount}.svg`;
  }
  button.disabled = true;
  guessesText.innerText = `Intentos restantes: ${wrongGuessCount} / ${maxGuesses}`;
  
}

/*Bucle para crear los botones del teclado del juego de maneta dinamica */
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button")
  button.innerText = String.fromCharCode(i);  
  keyboardDiv.appendChild(button);
  button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();