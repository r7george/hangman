const wordDisplay = document.querySelector(".countdown__guess-word");
const guessNumber = document.querySelector(".countdown__guess-number");

const alphabets = document.querySelectorAll(".guessing__letter");

const gameEndOutput = document.querySelector(".countdown__container");

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

// generate the blank spaces where the words go
const setBlankSpaces = (index, wordArr) => {
  return `<div class = "countdown__letter-div" value = "${index}"> <h2 class = "countdown__letter"> ${wordArr[index]} </h2></div>`;
}

// main function that sets up the board when the game is first loaded
const gameInit = () => {
  for (let i = 0; i < wordArr.length; i++) {
    wordDisplay.innerHTML += setBlankSpaces(i, wordArr);
  }
  setGuessCounter(guessesLeft);
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


let letters = document.querySelectorAll(".countdown__letter");

// displays the letter above a dash after it's been correctly guessed
const showGuess = (nodeList, guessIndexArr) => {
  guessIndexArr.map((index) => {
    nodeList[index].style.display = "flex";
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

// returns true if the guess is included within the total guess array
const isNotNewGuess = (guess, guessArr) => {
  return guessArr.includes(guess);
}

// returns true if the game has been won
const hasWon = (guessArr, wordArr) => {
  return guessArr.length == wordArr.length;
}

// sets the message at the end of the game
const setGameEndMsg = (msg) => {
  gameEndOutput.innerHTML = `<h2 class = "countdown__end-message"> ${msg} </h2>`;
}

// decrement the life counter
const decrementCount = (count) => {
  if (count > 0) {
    const decremented = --count;
    return decremented;
  }
  else {
    return count;
  }
}

// used to reset any variables based on their type
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

  // reset number doesn't show up when the game is reset due to this
  gameEndOutput.innerHTML = `<p class="countdown__title-text">Guesses left:&nbsp; </p>
  <p class="countdown__guess-number"></p>`;

  word = wordsArr[Math.floor(Math.random()*wordsArr.length)].toLowerCase();
  wordArr = word.split("");

  wordDisplay.innerHTML = ``;
  gameInit();
  
  letters = document.querySelectorAll(".countdown__letter");

  
  // document.location.reload();
}


submitBtn.addEventListener("click", handleClickGuess);
document.querySelector("#reset").addEventListener("click", handleClickReset);
document.querySelector("#reset").addEventListener("click", setGuessCounter(guessesLeft));