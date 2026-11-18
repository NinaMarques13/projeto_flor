document.addEventListener('DOMContentLoaded', () => {
    const countdownValues = {
        days: document.querySelector('[data-countdown="days"]'),
        hours: document.querySelector('[data-countdown="hours"]'),
        minutes: document.querySelector('[data-countdown="minutes"]'),
        seconds: document.querySelector('[data-countdown="seconds"]'),
    };
    const stopButton = document.getElementById('stop-countdown');

    function updateCountdown() {
        const now = new Date();
        const start = new Date(2026, 10, 19);
        const elapsedSeconds = Math.max(0, Math.floor((now - start) / 1000));
        const days = Math.floor(elapsedSeconds / 86400);
        const hours = Math.floor((elapsedSeconds % 86400) / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;

        countdownValues.days.textContent = String(days);
        countdownValues.hours.textContent = String(hours).padStart(2, '0');
        countdownValues.minutes.textContent = String(minutes).padStart(2, '0');
        countdownValues.seconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    const timerId = window.setInterval(updateCountdown, 1000);

    stopButton.addEventListener('click', () => {
        updateCountdown();
        window.clearInterval(timerId);
        stopButton.disabled = true;
        stopButton.textContent = 'Relógio parado';
    });
});