const words = [
  "abstract", "access", "account", "action", "adjust", "advice", "amount", "anchor", "answer", "aspect",
  "assign", "attack", "author", "backup", "beacon", "binary", "border", "bounce", "breeze", "bridge",
  "button", "candle", "canvas", "carbon", "castle", "charge", "circle", "client", "cloud", "cluster",
  "coding", "commit", "common", "compass", "config", "copy", "crash", "create", "custom", "damage",
  "debug", "define", "delete", "device", "digital", "domain", "download", "dynamic", "effect", "effort",
  "email", "engine", "escape", "ethics", "export", "extend", "feature", "filter", "flash", "flow",
  "folder", "format", "forum", "frame", "function", "future", "glitch", "global", "graphic", "group",
  "handle", "header", "hidden", "host", "hover", "icon", "import", "index", "input", "install",
  "interface", "internet", "item", "keyboard", "layout", "level", "library", "limit", "link", "local",
  "login", "logic", "loop", "matrix", "memory", "menu", "method", "module", "motion", "mouse"
];




const textInput = document.getElementById('player-input');
const Word = document.getElementById('Word');
const Timer = document.getElementById('timer');
const playerScore = document.getElementById('player-score');
const Highscores = document.getElementById('highscores');
const wpm = document.getElementById('WPM');

let countdown = 30;
let timerStarted = false;
let timerInterval = null;
let currentWord = "";
let Score = 0;
let correctchar = 0;
let WPM= 0;
let starttime =0;
let totalTime = 0;

function generateRandomWord() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  Word.textContent = currentWord;
}

function startTimer() {
  timerInterval = setInterval(() => {
    countdown--;
    if (countdown >= 0) {
      Timer.innerHTML = countdown;
      totalTime++;
    } else {
      clearInterval(timerInterval);
      Timer.innerHTML = "Time's UP!";
      calculateWPM(totalTime);
      storeScore();
      resetGame();
    }
  }, 1000);
}

function resetGame() {
  countdown = 30;
  timerStarted = false;
  Score = 0;
  correctchar = 0;
  textInput.value = "";
  textInput.disabled = false;
  Timer.innerHTML = countdown;
  generateRandomWord();
}

generateRandomWord();
let Scores = getHighscore();

textInput.addEventListener("keydown", function (e) {
  if (!timerStarted && e.key !== " " && e.key !== "Enter") {
    startTimer();
    timerStarted = true;
  }

  if (e.key === " ") {
    e.preventDefault();
    const wordTyped = textInput.value.trim();
    if (wordTyped === currentWord) {
      Score++;
      playerScore.innerHTML = `0${Score}`;
      // Play sound effect
      const correctSound = document.getElementById('correct-sound');
      if (correctSound) {
        correctSound.currentTime = 0;
        correctSound.play();
      }
    }
    textInput.value = "";
    generateRandomWord();
    textInput.style.borderColor = "grey";
  }
});

textInput.addEventListener("input", function () {
  const wordTyped = textInput.value;
  let isCorrectSoFar = true;
  correctchar++;
  console.log(correctchar);
  for (let i = 0; i < wordTyped.length; i++) {
    if (wordTyped[i] !== currentWord[i]) {
      isCorrectSoFar = false;
      correctchar--;
      console.log(`Incorrect ${correctchar}`)
      break;
    }
  }

  textInput.style.borderColor = isCorrectSoFar ? "green" : "red";
});



function storeScore()
{
  Scores.push(Score);
  localStorage.setItem("Scores" , JSON.stringify(Scores));
  getHighscore();
}
function getHighscore()
{
  let myHighscores = [];
  const storedScores = localStorage.getItem("Scores");
  if (storedScores) {
    myHighscores = JSON.parse(storedScores);
    myHighscores.sort((a,b) => b -a );
    displayHighscore(myHighscores);
  } else {
    console.log("No highscores found.");s
  }
  return myHighscores;
}
function displayHighscore(Scores)
{
  Highscores.innerHTML = "";
  let limit = Scores.length > 5 ? 5 : Scores.length;
  for(let i =0 ; i < limit ; i++ )
  {
    const newScore = document.createElement('li');
    newScore.textContent = Scores[i];
    Highscores.appendChild(newScore);
  }
}


function calculateWPM(time)
{
  let totalcorrect = correctchar / 5;
  WPM = totalcorrect / (time / 60);  
  WPM = Math.round(WPM);
  wpm.textContent = `WPM: ${WPM}`;


}