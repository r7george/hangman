const wordDisplay = document.querySelector(".guess");
const guessNumber = document.querySelector(".guess-number");

const alphabets = document.querySelectorAll(".alphabet");

const alphabetInput = document.querySelector(".hangman__submit-guess__input");
const inputSubmit = document.querySelector(".hangman__submit-guess__btn");


let guess = "";


const handleClickGuess = () => {
  guess = alphabetInput.value;
  console.log(guess);
}

const checkAlphabet = () => {
  alphabets.forEach((alphabet) => {
    if (guess) {
      
    }
  })
}


inputSubmit.addEventListener("click", handleClickGuess);


