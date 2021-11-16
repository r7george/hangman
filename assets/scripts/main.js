const wordDisplay = document.querySelector(".guess");
const guessNumber = document.querySelector(".guess-number");

const alphabets = document.querySelectorAll(".alphabet");

const alphabetInput = document.querySelector(".hangman__submit-guess__input");
const inputSubmit = document.querySelector(".hangman__submit-guess__btn");

// const letters = document.querySelectorAll("h2");


let guess = "";
let word = "hidden";
const wordArr = word.split("");


const generateBlankSpaces = (index) => {
  return `<div class = "alphabet-guess" value = "${index}"> <h2 class = "letter"> ${wordArr[index]} </h2></div>`
}

const generateWord = () => {
  for (let i = 0; i < wordArr.length; i++) {
    wordDisplay.innerHTML += generateBlankSpaces(i);
  }
}

generateWord();


const checkAlphabet = () => {
  const isCorrectGuess = word.toLowerCase().includes(guess.toLowerCase());
  if (isCorrectGuess) {
    console.log("success?");
  }
  else {
    alphabets.forEach((alphabet) => {
      if (guess.toLowerCase() == alphabet.innerHTML) {
          alphabet.style.display="none";
      }
    });
  }
}

const handleClickGuess = () => {
  guess = alphabetInput.value;
  console.log(word.toLowerCase().includes(guess.toLowerCase()))
  checkAlphabet();
}


inputSubmit.addEventListener("click", handleClickGuess);


