/* Pomodoro Timer (FCC) */

(function () {
    // Elements
    const breakDec = document.getElementById('break-decrement');
    const breakInc = document.getElementById('break-increment');
    const sessionDec = document.getElementById('session-decrement');
    const sessionInc = document.getElementById('session-increment');

    const breakLenEl = document.getElementById('break-length');
    const sessionLenEl = document.getElementById('session-length');
    const timerLabel = document.getElementById('timer-label');
    const timeLeftEl = document.getElementById('time-left');

    const startStopBtn = document.getElementById('start_stop');
    const resetBtn = document.getElementById('reset');
    const beep = document.getElementById('beep');

    // Constants
    const MIN = 1, MAX = 60;
    const DEFAULT_BREAK = 5, DEFAULT_SESSION = 25;

    // State
    let breakLength = DEFAULT_BREAK;
    let sessionLength = DEFAULT_SESSION;
    let currentMode = 'session';
    let remaining = sessionLength * 60;
    let running = false;
    let intervalId = null;

    // Helpers
    const format = s => {
        const m = Math.floor(s / 60);
        const sec = s % 60;
        return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    const updateDisplay = () => {
        breakLenEl.textContent = breakLength;
        sessionLenEl.textContent = sessionLength;
        timerLabel.textContent = currentMode === 'session' ? 'Session' : 'Break';
        timeLeftEl.textContent = format(remaining);
    };

    const clamp = n => Math.min(MAX, Math.max(MIN, n));

    const startTimer = () => {
        if (intervalId) return;
        running = true;
        intervalId = setInterval(() => {
            if (remaining > 0) {
                remaining--;
                timeLeftEl.textContent = format(remaining);
            } else {
                try { beep.currentTime = 0; beep.play(); } catch (e) { }
                currentMode = currentMode === 'session' ? 'break' : 'session';
                remaining = (currentMode === 'session' ? sessionLength : breakLength) * 60;
                updateDisplay();
            }
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(intervalId);
        intervalId = null;
        running = false;
    };

    const resetAll = () => {
        stopTimer();
        breakLength = DEFAULT_BREAK;
        sessionLength = DEFAULT_SESSION;
        currentMode = 'session';
        remaining = sessionLength * 60;
        try { beep.pause(); beep.currentTime = 0; } catch (e) { }
        updateDisplay();
    };

    // Button actions
    breakDec.addEventListener('click', () => {
        if (running) return;
        breakLength = clamp(breakLength - 1);
        if (currentMode === 'break') remaining = breakLength * 60;
        updateDisplay();
    });

    breakInc.addEventListener('click', () => {
        if (running) return;
        breakLength = clamp(breakLength + 1);
        if (currentMode === 'break') remaining = breakLength * 60;
        updateDisplay();
    });

    sessionDec.addEventListener('click', () => {
        if (running) return;
        sessionLength = clamp(sessionLength - 1);
        if (currentMode === 'session') remaining = sessionLength * 60;
        updateDisplay();
    });

    sessionInc.addEventListener('click', () => {
        if (running) return;
        sessionLength = clamp(sessionLength + 1);
        if (currentMode === 'session') remaining = sessionLength * 60;
        updateDisplay();
    });

    startStopBtn.addEventListener('click', () => {
        running ? stopTimer() : startTimer();
    });

    resetBtn.addEventListener('click', resetAll);

    beep.addEventListener('ended', () => { try { beep.currentTime = 0; } catch (e) { } });

    // Init
    resetAll();
})();
