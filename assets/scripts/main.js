const wordDisplay = document.querySelector(".guess");
const guessNumber = document.querySelector(".guess-number");

const alphabets = document.querySelectorAll(".alphabet");

const winnerOutput = document.querySelector(".hangman__word__counter");

const alphabetInput = document.querySelector(".hangman__submit-guess__input");
const inputSubmit = document.querySelector(".hangman__submit-guess__btn");


let guess = "";
let guessArr = [];
let correctGuessArr = [];
let word = "win";
const wordArr = word.split("");


const resetGame = () => {
  guessNumber.innerHTML = `6`;
  alphabets.forEach((alphabet) => {
    alphabet.style.display = "flex";
  });
  letters.forEach((letter) => {
    letter.style.display = "none";
  });
  guessArr = [];
  correctGuessArr = [];
}

const generateBlankSpaces = (index) => {
  return `<div class = "alphabet-guess" value = "${index}"> <h2 class = "letter"> ${wordArr[index]} </h2></div>`;
}

const generateWord = () => {
  for (let i = 0; i < wordArr.length; i++) {
    wordDisplay.innerHTML += generateBlankSpaces(i);
  }
}

generateWord();


const guessCounterCountdown = () => {
  let guessCount = parseInt(guessNumber.innerHTML);
  guessCount -= 1;
  if (guessCount > 0) {
    guessNumber.innerHTML = `${guessCount}`;
  }
  else {
    alert("Game Over!");
    resetGame();
  }
}


const getCorrectGuessIndex = (arr, val) => {
  const indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}


const letters = document.querySelectorAll(".letter");

const makeDisplayFlex = () => {
  const guessIndexArr = getCorrectGuessIndex(wordArr, guess);
  guessIndexArr.map((index) => {
    letters[index].style.display = "flex";
  });
}


const winningMessage = () => {
  winnerOutput.innerHTML = `<h2 class = "hangman__word__counter__winning-message"> YOU'VE GUESSED IT! CONGRATS! </h2>`;
}


const checkAlphabet = () => {
  const isCorrectGuess = word.toLowerCase().includes(guess.toLowerCase());
  const isNotNewGuess = guessArr.includes(guess.toLowerCase());
  console.log(isNotNewGuess);
  if(!isNotNewGuess) {
    if (isCorrectGuess) {
      const uniqWordArr = [...new Set(wordArr)];
      guessArr.push(guess.toLowerCase());
      correctGuessArr.push(guess.toLowerCase());
      if (correctGuessArr.length == uniqWordArr.length) {
        makeDisplayFlex();
        winningMessage();
      }
      else {
        makeDisplayFlex();
      }
     
    }
    else {
      guessArr.push(guess.toLowerCase());
      alphabets.forEach((alphabet) => {
        if (guess.toLowerCase() == alphabet.innerHTML) {
            alphabet.style.display="none";
            guessCounterCountdown();
        }
      });
    }
  }
}


const handleClickGuess = () => {
  guess = alphabetInput.value;
  console.log(word.toLowerCase().includes(guess.toLowerCase()))
  checkAlphabet();
}


inputSubmit.addEventListener("click", handleClickGuess);


