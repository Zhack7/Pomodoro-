let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Link suara alarm (Bisa diganti kalau punya link suara MP3 lain)
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

// Meminta izin notifikasi ke browser saat web pertama kali dimuat
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update angka di layar
  timeDisplay.textContent = formattedTime;
  
  // Update angka di Tab Browser
  document.title = `(${formattedTime}) Pomodoro Timer`;
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
        
        // 1. Mainkan Suara
        alarmSound.play();
        
        // 2. Munculkan Notifikasi Desktop
        if (Notification.permission === "granted") {
          new Notification("Waktu Habis! ⏰", {
            body: "Kerja bagus! Waktunya ganti sesi atau istirahat sejenak.",
          });
        } else {
          // Fallback kalau notifikasi browser diblokir
          alert('Waktu habis! Waktunya ganti sesi.');
        }
        
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
updateDisplay();let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Link suara alarm (Bisa diganti kalau punya link suara MP3 lain)
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

// Meminta izin notifikasi ke browser saat web pertama kali dimuat
if ("Notification" in window && Notification.permission !== "granted") {
  Notification.requestPermission();
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Update angka di layar
  timeDisplay.textContent = formattedTime;
  
  // Update angka di Tab Browser
  document.title = `(${formattedTime}) Pomodoro Timer`;
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
        
        // 1. Mainkan Suara
        alarmSound.play();
        
        // 2. Munculkan Notifikasi Desktop
        if (Notification.permission === "granted") {
          new Notification("Waktu Habis! ⏰", {
            body: "Kerja bagus! Waktunya ganti sesi atau istirahat sejenak.",
          });
        } else {
          // Fallback kalau notifikasi browser diblokir
          alert('Waktu habis! Waktunya ganti sesi.');
        }
        
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