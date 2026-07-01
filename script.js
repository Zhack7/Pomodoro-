let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timeDisplay.textContent = formattedTime;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timerId);
    startPauseBtn.textContent = 'Start';
  } else {
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timerId);
        alert('Waktu habis!');
        resetTimer();
      }
    }, 1000);
    startPauseBtn.textContent = 'Pause';
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = modes[currentMode];
  startPauseBtn.textContent = 'Start';
  updateDisplay();
}

function setMode(mode, btnElement) {
  currentMode = mode;
  modeButtons.forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  resetTimer();
}

// Inisialisasi awal
updateDisplay();