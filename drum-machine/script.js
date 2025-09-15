// script.js — Drum Machine behavior (fulfills FCC tests)
(function () {
    // Key order and valid keys
    const VALID_KEYS = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C'];

    // Grab DOM elements
    const drumMachine = document.getElementById('drum-machine');
    const display = document.getElementById('display');
    const pads = Array.from(document.querySelectorAll('.drum-pad'));

    // Utility: play a pad (button element)
    function playPad(padEl) {
        if (!padEl) return;
        const audio = padEl.querySelector('audio.clip');
        if (!audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => {/* ignore play errors from autoplay policies */ });
        // Add a short visual active state
        padEl.classList.add('playing');
        setTimeout(() => padEl.classList.remove('playing'), 120);
        // Update display text with the human-friendly name (data-sound) or id
        const name = padEl.dataset.sound || padEl.id || '';
        display.innerText = name;
    }

    // Click listeners for each pad
    pads.forEach(pad => {
        pad.addEventListener('click', () => playPad(pad));
        // also allow clicking on inner text not just button edges
        pad.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                playPad(pad);
            }
        });
    });

    // Keyboard listener
    window.addEventListener('keydown', (ev) => {
        const key = ev.key.toUpperCase();
        if (!VALID_KEYS.includes(key)) return;
        // find the pad that contains audio with id=key
        const audio = document.getElementById(key);
        if (!audio) return;
        // parent is .drum-pad
        const pad = audio.closest('.drum-pad');
        if (!pad) return;
        playPad(pad);
    });

    // Ensure audio elements have the "clip" class and correct ids (tests will check this in DOM)
    // (This is not strictly necessary but guarantees markup correctness in case of accidental changes.)
    pads.forEach(pad => {
        const audio = pad.querySelector('audio');
        if (audio && !audio.classList.contains('clip')) audio.classList.add('clip');
        const letter = pad.textContent.trim().charAt(0).toUpperCase();
        if (audio && audio.id !== letter) audio.id = letter;
    });

    // Reset display when clicking outside (optional nicety)
    document.addEventListener('click', (e) => {
        if (!drumMachine.contains(e.target)) {
            // keep it minimal; do not clear if clicking other controls in machine
            // display.innerText = 'Ready';
        }
    });

    // Accessibility: focusable pads
    pads.forEach(p => p.setAttribute('tabindex', '0'));

    // initial message
    display.innerText = "Hit a pad or press Q W E A S D Z X C";
})();
