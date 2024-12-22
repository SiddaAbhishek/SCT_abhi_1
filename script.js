let timer;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let lapCount = 1;

const timeDisplay = document.getElementById('timeDisplay');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapList = document.getElementById('lapList');

// Function to format time as mm:ss:ms
function formatTime(ms) {
    let minutes = Math.floor(ms / 60000);
    let seconds = Math.floor((ms % 60000) / 1000);
    let milliseconds = ms % 1000;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    milliseconds = milliseconds < 100 ? '0' + milliseconds : milliseconds;

    return `${minutes}:${seconds}:${milliseconds}`;
}

// Function to update the time display
function updateTime() {
    elapsedTime = Date.now() - startTime + (elapsedTime || 0);
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Function to start or stop the timer
function toggleStartStop() {
    if (isRunning) {
        clearInterval(timer);
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        startStopBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    lapTimes = [];
    lapCount = 1;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startStopBtn.textContent = 'Start';
}

// Function to record a lap time
function recordLap() {
    if (isRunning) {
        let lapTime = elapsedTime;
        lapTimes.push(lapTime);

        const lapItem = document.createElement('li');
        lapItem.className = 'lap-time';
        lapItem.textContent = `Lap ${lapCount}: ${formatTime(lapTime)}`;
        lapList.appendChild(lapItem);

        lapCount++;
    }
}

// Event listeners for the buttons
startStopBtn.addEventListener('click', toggleStartStop);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
