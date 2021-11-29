const wordDisplay = document.querySelector(".countdown__guess-word");
const guessNumber = document.querySelector(".countdown__guess-number");

const alphabets = document.querySelectorAll(".guessing__letter");

const guessContainer = document.querySelector(".countdown__container");
const endOutput = document.querySelector(".countdown__end-message");

const alphabetInput = document.querySelector(".user-inputs__guess");
const submitBtn = document.querySelector("#submit");


const wordsArr = ["html", "css", "javascript", "flexbox", "grid", "bootstrap", "function", "responsive", "iterator", "object", "classes", "testing", "hangman", "specificity", "button", "main", "div"];


let guess = "";
let guessArr = [];
let correctGuessArr = [];
let word = wordsArr[Math.floor(Math.random()*wordsArr.length)].toLowerCase();
let wordArr = word.split("");
let guessesLeft = 6;


// set the guess counter number on the screen
const setGuessCounter = (count) => {
  guessNumber.innerHTML = `${count}`;
}

/**
 * @param  {Number} index - the index of a letter within the wordArr
 * @param  {Array} wordArr - an array containing each letter of the guess word
 * @returns HTML to generate the blank spaces for the guess word
 */
const getBlankSpaces = (index, wordArr) => {
  return `<div class = "countdown__letter-div" value = "${index}"> <h2 class = "countdown__letter"> ${wordArr[index]} </h2></div>`;
}

// main function that sets up the board when the game is first loaded
const gameInit = () => {
  for (let i = 0; i < wordArr.length; i++) {
    wordDisplay.innerHTML += getBlankSpaces(i, wordArr);
  }
  setGuessCounter(guessesLeft);
}
gameInit();


/**
 * @param  {Array} arr - Array of the word being guessed
 * @param  {String} val - Letter that's being guessed by the user
 * @returns An array containing the indexes of the letter of the correct guess within the word array
 */
const getCorrectGuessIndex = (arr, val) => {
  const indexes = [];
  let i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

let letters = document.querySelectorAll(".countdown__letter");

 // Displays the letter above a dash after it's been correctly guessed
const showGuess = (nodeList, guessIndexArr) => {
  guessIndexArr.forEach((index) => {
    nodeList[index].style.display = "flex";
  });
}

// Removes the parameter from the letter display as it's being guessed
const removeLetter = (alphabet) => {
  alphabet.forEach((letter) => {
    if (guess == letter.innerHTML) {
        letter.style.display="none";
    }
  });
}

/**
 * @param  {String} guess - Letter we are guessing
 * @param  {String} word - Word containing correct letters
 * @returns True/False whether this is an incorrect guess
 */
const isCorrectGuess = (guess, word) => {
  return word.includes(guess);
}

/**
 * @param  {String} guess - Letter we are guessing
 * @param  {Array} guessArr - Array with all the guesses made by the user
 * @returns True/False whether it's a new guess
 */
const isNotNewGuess = (guess, guessArr) => {
  return guessArr.includes(guess);
}

/**
 * @param  {Array} guessArr - Array with all the correct guesses
 * @param  {Array} wordArr - Array with all the letters for the guess word
 * @returns True/False if the game has been won or not
 */
const hasWon = (guessArr, wordArr) => {
  return guessArr.length == wordArr.length;
}

// sets the message at the end of the game
const setGameEndMsg = (msg) => {
  endOutput.innerHTML = `<h2> ${msg} </h2>`;
}

/**
 * @param  {Number} count - Number of guesses left
 * @returns the number decremented if it is > 0
 */
const decrementCount = (count) => {
  if (count > 0) {
    const decremented = --count;
    return decremented;
  }
  else {
    return count;
  }
}

/**
 * @param  {String/Array} variable - random global variable that's either a string or array
 * @returns an empty string/array depending on it's type (acts as a reset)
 */
const resetVariable = (variable) => {
  if (typeof variable == "string") {
    variable = "";
    return variable;
  }
  else if (typeof variable == "object") {
    variable = [];
    return variable;
  }  
}

const handleClickGuess = () => {
  guess = alphabetInput.value.toLowerCase();
  // so that the input is ready for the next guess
  alphabetInput.value = "";
  // 1. Remove the letter from the keyboard display
  removeLetter(alphabets);
  
   // 2. Add the guess to the guess array of letters if it's a new guess
  if (!isNotNewGuess(guess, guessArr)) {
    guessArr.push(guess);
  }

  // 3. Is it a correct guess?
  if (isCorrectGuess(guess, word)){
    
    // Get unique letters from the word array, because a word can have the same letter multiple times
    const uniqWordArr = [...new Set(wordArr)];
    // displays guess on the board
    showGuess(letters, getCorrectGuessIndex(wordArr, guess));
    correctGuessArr.push(guess);

    // so the submit button can't be spam clicked
    guess = resetVariable("string", guess);
    
    /* get unique letters of the correct guess as spamming submit would still cause game to be won if there isn't a unique array of correct guesses to check against */
    const uniqCorrectGuessArr = [...new Set(correctGuessArr)];
    // Check if the game's been won
    // the .join("").split("") gets rid of any empty string entries
    if (hasWon(uniqWordArr, uniqCorrectGuessArr.join("").split(""))) {
       setGameEndMsg("WINNER WINNER CHICKEN DINNER");
       submitBtn.disabled = true;
    }
  }
  // 4. What happens if it is an incorrect guess?
  else {
    // lowers the guesses left
    guessesLeft = decrementCount(guessesLeft);
    setGuessCounter(guessesLeft);
    // if guessesLeft = 0, end the game
    if (guessesLeft == 0) {
      setGameEndMsg("BETTER LUCK NEXT TIME ._.");
      letters.forEach((letter) => {
        letter.style.display = "flex";
      });
      submitBtn.disabled = true;
    }
  }
}


// resets board by reloading page
const handleClickReset = () => {
  
  guessesLeft = 6;
  guess = resetVariable(guess);
  guessArr = resetVariable(guessArr);
  correctGuessArr = resetVariable(correctGuessArr);
  
  alphabets.forEach((alphabet) => {
    alphabet.style.display = "flex";
  });
  letters.forEach((letter) => {
    letter.style.display = "none";
  });

  endOutput.innerHTML = ``;

  word = wordsArr[Math.floor(Math.random()*wordsArr.length)].toLowerCase();
  wordArr = word.split("");

  wordDisplay.innerHTML = ``;
  gameInit();
  
  letters = document.querySelectorAll(".countdown__letter");
}


submitBtn.addEventListener("click", handleClickGuess);
document.querySelector("#reset").addEventListener("click", handleClickReset);