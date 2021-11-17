const wordDisplay = document.querySelector(".guess");
const guessNumber = document.querySelector(".guess-number");

const alphabets = document.querySelectorAll(".alphabet");

const gameEndOutput = document.querySelector(".hangman__word__counter");

const alphabetInput = document.querySelector(".hangman__submit-guess__input");
const inputSubmit = document.querySelector("#submit");


let guess = "";
let guessArr = [];
let correctGuessArr = [];
let word = "variable";
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
  gameEndOutput.innerHTML = `<p class="hangman__word__counter__text">Guesses left:&nbsp; </p><p class="hangman__word__counter__text guess-number">6</p>`;
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


const losingMessage = () => {
  gameEndOutput.innerHTML = `<h2 class = "hangman__word__counter__winning-message"> BETTER LUCK NEXT TIME ._. </h2>`;
}


const guessCounterCountdown = () => {
  let guessCount = parseInt(guessNumber.innerHTML);
  guessCount -= 1;
  if (guessCount > 0) {
    guessNumber.innerHTML = `${guessCount}`;
  }
  else {
    losingMessage();
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
  gameEndOutput.innerHTML = `<h2 class = "hangman__word__counter__winning-message"> WINNER WINNER CHICKEN DINNER </h2>`;
}

const removeAlphabet = () => {
  alphabets.forEach((alphabet) => {
    if (guess.toLowerCase() == alphabet.innerHTML) {
        alphabet.style.display="none";
    }
  });
}


const checkAlphabet = () => {
  const isCorrectGuess = word.toLowerCase().includes(guess.toLowerCase());
  const isNotNewGuess = guessArr.includes(guess.toLowerCase());
  console.log(isNotNewGuess);
  if(!isNotNewGuess) {
    if (isCorrectGuess) {
      removeAlphabet();
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
      removeAlphabet();
      guessCounterCountdown();
    }
  }
}


const handleClickGuess = () => {
  guess = alphabetInput.value;
  alphabetInput.value = "";
  checkAlphabet();
}


inputSubmit.addEventListener("click", handleClickGuess);
document.querySelector("#reset").addEventListener("click", resetGame);