let timeLeft = 25 * 60;
let timerId = null;
let isRunning = false;
let currentMode = 'pomodoro';

const timeDisplay = document.getElementById('time');
const startPauseBtn = document.getElementById('startPauseBtn');
const modeButtons = document.querySelectorAll('.mode-btn');

// Link suara alarm
const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60
};

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
  // Pindahkan request permission ke dalam tombol agar tidak diblokir browser
  try {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  } catch (error) {
    console.log("Izin notifikasi diblokir oleh sistem embed.");
  }

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
        
        // Mainkan Suara
        try {
          alarmSound.play();
        } catch(e) {
          console.log("Suara diblokir oleh browser.");
        }
        
        // Munculkan Notifikasi Desktop atau Fallback Alert
        try {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("Waktu Habis! ⏰", {
              body: "Kerja bagus! Waktunya ganti sesi atau istirahat sejenak.",
            });
          } else {
            alert('Waktu habis! Waktunya ganti sesi.');
          }
        } catch (error) {
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
