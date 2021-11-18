const wordDisplay = document.querySelector(".guess");
const guessNumber = document.querySelector(".guess-number");

const alphabets = document.querySelectorAll(".alphabet");

const gameEndOutput = document.querySelector(".hangman__word__counter");

const alphabetInput = document.querySelector(".hangman__submit-guess__input");
const inputSubmit = document.querySelector("#submit");


const wordsArr = ["html", "css", "javascript", "flexbox", "grid", "bootstrap", "function", "responsive", "iterator", "object", "classes", "testing", "hangman"];

let guess = "";
let guessArr = [];
let correctGuessArr = [];
let word = wordsArr[Math.floor(Math.random()*wordsArr.length)];
const wordArr = word.split("");


// generate the blank spaces where the words go
const generateBlankSpaces = (index) => {
  return `<div class = "alphabet-guess" value = "${index}"> <h2 class = "letter"> ${wordArr[index]} </h2></div>`;
}

// main function that sets up the board when the game is first loaded
const gameInit = () => {
  for (let i = 0; i < wordArr.length; i++) {
    wordDisplay.innerHTML += generateBlankSpaces(i);
  }
}
gameInit();

// returns the indexes of the letter of the correct guess within the word array
const getCorrectGuessIndex = (arr, val) => {
  const indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}


const letters = document.querySelectorAll(".letter");

// displays the letter above a dash after it's been correctly guessed
const showGuess = (guess, wordArr) => {
  const guessIndexArr = getCorrectGuessIndex(wordArr, guess);
  guessIndexArr.map((index) => {
    letters[index].style.display = "flex";
  });
}

// removing the letter from letter display if it's been guessed
const removeLetter = (alphabet) => {
  alphabet.forEach((letter) => {
    if (guess == letter.innerHTML) {
        letter.style.display="none";
    }
  });
}

// returns true or false based on whether it's a correctly guesssed letter
const isCorrectGuess = (guess, word) => {
  return word.includes(guess);
}

// returns true if the guessArr
const isNotNewGuess = (guess, guessArr) => {
  return guessArr.includes(guess);
}

// returns true if the game has been won
const hasWon = (guessArr, wordArr) => {
  return guessArr.length == wordArr.length;
}


const handleClickGuess = () => {
  guess = alphabetInput.value.toLowerCase();
  alphabetInput.value = "";
  // 1. Remove the letter from the keyboard display
  removeLetter(alphabets);

  console.log(isNotNewGuess(guess, guessArr));
  console.log(isCorrectGuess(guess, word));
  console.log(isNotNewGuess(guess, guessArr) && isCorrectGuess(guess, word));
  
  if (!isNotNewGuess(guess, guessArr)){
    // 2. Add the guess to the guess array of letters
    guessArr.push(guess);
    // 3. Is it a correct guess?
    if(isCorrectGuess(guess, word)){
      // Get unique letters from the word array, because a word can have the same letter multiple times
      const uniqWordArr = [...new Set(wordArr)];
      showGuess(guess, wordArr);
      correctGuessArr.push(guess);
      // Check if the game's been won
      if (hasWon(uniqWordArr, correctGuessArr)) {
        gameEndOutput.innerHTML = `<h2 class = "hangman__word__counter__winning-message"> WINNER WINNER CHICKEN DINNER </h2>`;
      }
    }
  }
  // 4. What happens if it is an incorrect guess?
  else {
    // Get and lower guess count
    let guessCount = parseInt(guessNumber.innerHTML);
    guessCount -= 1;
    // If guess count is greater than 0, update the innerHTMl with guess count
    if (guessCount > 0) {
      guessNumber.innerHTML = `${guessCount}`;
    } else { // If it's lower than 0, then display the 
      gameEndOutput.innerHTML = `<h2 class = "hangman__word__counter__winning-message"> BETTER LUCK NEXT TIME ._. </h2>`;
    }
  }
}

// resets board by reloading page
const handleClickReset = () => {
  document.location.reload();
}


inputSubmit.addEventListener("click", handleClickGuess);
document.querySelector("#reset").addEventListener("click", handleClickReset);