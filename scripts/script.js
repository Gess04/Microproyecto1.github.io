const wordlist = [
  {
    word:"lluvia",
    hint:"Liquido que cae del cielo"
  },
  {
    word:"azucar",
    hint:"Sustancia utilizada para dar dulzor a los alimentos."
  },
  {
    word:"europa",
    hint:"Continente al este del Oceano Atlantico."
  },
  {
    word:"futbol",
    hint:"Deporte mas famoso del mundo."
  }
];

const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman_box img");
const guessesText = document.querySelector(".guesses");
const wordDisplay = document.querySelector(".letter_display");
const finishModal = document.querySelector(".finish_modal");
const playAgain = document.querySelector(".finish_modal");
let currentWord, correctLetters, wrongGuessCount = 0;
const maxGuesses = 6;


/*Comenzar el juego de nuevo*/
const startOver = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `imagenes/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `Intentos realizados: ${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(button => button.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() =>'<li class="letter"></li>').join("");
  finishModal.classList.remove("show");
}

/*Generar palabras aleatoriamente por medio de una funcion flecha*/
const getRandomWord = () => {
  const {word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint").innerText = hint;
  wordDisplay.innerHTML = currentWord.split("").map(() =>'<li class="letter"></li>').join("");
  startOver();
}

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? "Adivinaste la palabra:" : "La palabra correcta era";
    finishModal.querySelector("img").src = `imagenes/${isVictory ? "win" : "lose"}.gif`;
    finishModal.querySelector("h4").innerText = `${isVictory ? "Has Ganado!" :  "Has Perdido!"}`;
    finishModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    finishModal.classList.add("show");
  }, 300);
}


/*Funcion flecha para inicializar las letras del teclado */
const initGame = (button, clickedLetter) => {
  if(currentWord.includes(clickedLetter)){
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
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
  guessesText.innerText = `Intentos realizados: ${wrongGuessCount} / ${maxGuesses}`;

  if(wrongGuessCount === maxGuesses) return gameOver(false);
  if(correctLetters.length === currentWord.length) return gameOver(true);

}

/*Bucle para crear los botones del teclado del juego de maneta dinamica */
for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button")
  button.innerText = String.fromCharCode(i);  
  keyboardDiv.appendChild(button);
  button.addEventListener("click",e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);