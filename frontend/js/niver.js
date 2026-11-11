document.addEventListener('DOMContentLoaded', () => {
    const countdownValues = {
        days: document.querySelector('[data-countdown="days"]'),
        hours: document.querySelector('[data-countdown="hours"]'),
        minutes: document.querySelector('[data-countdown="minutes"]'),
        seconds: document.querySelector('[data-countdown="seconds"]'),
    };

    function updateCountdown() {
        const now = new Date();
        let birthday = new Date(now.getFullYear(), 10, 19);

        if (birthday <= now) {
            birthday = new Date(now.getFullYear() + 1, 10, 19);
        }

        const remainingSeconds = Math.max(0, Math.floor((birthday - now) / 1000));
        const days = Math.floor(remainingSeconds / 86400);
        const hours = Math.floor((remainingSeconds % 86400) / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        countdownValues.days.textContent = String(days);
        countdownValues.hours.textContent = String(hours).padStart(2, '0');
        countdownValues.minutes.textContent = String(minutes).padStart(2, '0');
        countdownValues.seconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
});