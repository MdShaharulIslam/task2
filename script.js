// Select Elements
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

let interval;
let elapsedTime = 0;
let isRunning = false;

// Format time helper function
function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return {
    minutes: minutes.toString().padStart(2, '0'),
    seconds: seconds.toString().padStart(2, '0'),
    milliseconds: milliseconds.toString().padStart(2, '0'),
  };
}

// Update display
function updateDisplay() {
  const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;
  millisecondsSpan.textContent = milliseconds;
}

// Start the stopwatch
function startStopwatch() {
  if (!isRunning) {
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;

    const startTime = Date.now() - elapsedTime;

    interval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
  }
}

// Pause the stopwatch
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

// Reset the stopwatch
function resetStopwatch() {
  clearInterval(interval);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  lapsList.innerHTML = '';
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
}

// Add a lap
function addLap() {
  if (isRunning) {
    const { minutes, seconds, milliseconds } = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `${minutes}:${seconds}:${milliseconds}`;
    lapsList.appendChild(lapItem);
  }
}

// Event Listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapsList.addEventListener('click', addLap);
