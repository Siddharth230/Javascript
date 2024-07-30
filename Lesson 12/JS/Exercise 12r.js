let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  loses: 0,
  ties: 0,
};
document.querySelector(
  ".js-score"
).innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}.`;

updateScoreElement();

/*
      if (!score) {
        score = {
          wins: 0,
          loses: 0,
          ties: 0,
        };
      }
        */

let isAutoPlaying = false;
let intervalId;

//const autoPlay= () => {

//}

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    autoPlay();
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  }
});

document
  .querySelector(".js-auto-play-button")
  .addEventListener("click", () => autoPlay());

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;

    document.querySelector(".js-auto-play-button").innerHTML = "Stop playing";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play-button").innerHTML = "Auto Play";
  }
}

function resetScore() {
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

document
  .querySelector(".js-reset-score-button")
  .addEventListener("click", () => {
    showResetConfirmation();
  });

function showResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = `
      Are you sure you want to reset the score? 
      <button class='js-reset-yes-confirmation reset-confirm-button'> Yes</button>
      <button class='js-reset-no-confirmation reset-confirm-button'> No</button>
    `;

  document
    .querySelector(".js-reset-yes-confirmation")
    .addEventListener("click", () => {
      resetScore();
      hideResetConfirmation();
    });

  document
    .querySelector(".js-reset-no-confirmation")
    .addEventListener("click", () => {
      hideResetConfirmation();
    });
}

function hideResetConfirmation() {
  document.querySelector(".js-reset-confirmation").innerHTML = "";
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lost.";
    } else if (computerMove === "paper") {
      result = "You Win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You Lost.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You Lost.";
    } else if (computerMove === "scissors") {
      result = "You Win.";
    }
  }

  if (result === "You Win.") {
    score.wins += 1;
  } else if (result === "You Lost.") {
    score.loses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(".js-moves").innerHTML = `
      You <img src="Icons/${playerMove}-emoji.png" class="move-icon" />
      <img src="Icons/${computerMove}-emoji.png" class="move-icon" /> Computer`;
}

function resultElement() {
  document.querySelector(".js-result").innerHTML = `${result}`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}
