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

/**Se inicializan las variables para poder darle funcionalidad con el codigo de javascript */
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman_box img");
const guessesText = document.querySelector(".guesses");
const wordDisplay = document.querySelector(".letter_display");
const finishModal = document.querySelector(".finish_modal");
const playAgainButton = document.querySelector(".regame");
const resetButton = document.querySelector(".reset-table");
const scoreTableBody = document.querySelector("#scoreTable tbody");
const scoreTable = document.querySelector("#scoreTable");
let currentWord, correctLetters, wrongGuessCount = 0;
const maxGuesses = 6;


/*Funcion flecha para comenzar el juego de nuevo*/
const startOver = () => {
  correctLetters = [];
  wrongGuessCount = 0;
  hangmanImage.src = `imagenes/hangman-${wrongGuessCount}.svg`;
  guessesText.innerText = `Intentos realizados: ${wrongGuessCount} / ${maxGuesses}`;
  keyboardDiv.querySelectorAll("button").forEach(button => button.disabled = false);
  wordDisplay.innerHTML = currentWord.split("").map(() =>'<li class="letter"></li>').join("");
  finishModal.classList.remove("show");
  getRandomWord();
}

const resetTable = () => {
  localStorage.clear();
  scoreTableBody.innerHTML = ""
}

/*Generar palabras aleatoriamente por medio de una funcion flecha*/
const getRandomWord = () => {
  const {word, hint} = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(word);
  currentWord = word;
  correctLetters=[];
  document.querySelector(".hint").innerText = hint;
  wordDisplay.innerHTML = currentWord.split("").map(() =>'<li class="letter"></li>').join("");
  finishModal.classList.remove("show");
}

/*Funcion flecha para determinar si el jugador ha ganado o perdido.*/
const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory ? "Adivinaste la palabra:" : "La palabra correcta era";
    finishModal.querySelector("img").src = `imagenes/${isVictory ? "win" : "lose"}.gif`;
    finishModal.querySelector("h4").innerText = `${isVictory ? "Has Ganado!" :  "Has Perdido!"}`;
    finishModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    finishModal.classList.add("show");
    updateScoreTable(isVictory ? 1:0);
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
playAgainButton.addEventListener("click", startOver);
resetButton.addEventListener("click", resetTable)

/**Funcion flecha para actualizar la tabla de puntajes, incluyendo el registro de nuevos jugadores*/
const updateScoreTable = (score) => {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  const playerName = prompt("Introduce tu nombre:");
  scores.push({ player: playerName, score: score });
  localStorage.setItem("scores", JSON.stringify(scores));
  renderScoreTable();
}

/**Funcion flecha para crear la tabla al inicializar el juego */
const renderScoreTable = () => {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scoreTableBody.innerHTML = "";
  scores.forEach(({ player, score }) => {
      const row = document.createElement("tr");
      const playerCell = document.createElement("td");
      const scoreCell = document.createElement("td");
      playerCell.innerText = player;
      scoreCell.innerText = score;
      row.appendChild(playerCell);
      row.appendChild(scoreCell);
      scoreTableBody.appendChild(row);
  });
  scoreTable.style.border = "2px solid black";
  scoreTable.querySelectorAll("th, td").forEach(cell => {
      cell.style.border = "1px solid black";
  });
}

renderScoreTable();