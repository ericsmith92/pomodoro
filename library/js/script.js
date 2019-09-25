function start(){
    const startBtn = document.querySelector('.timer_controls__btn');
    const timerMins = document.querySelector('.timer_minutes');
    const timerSecs = document.querySelector('.timer_seconds');
    const ding = document.querySelector('.timer_audio');

    let timeTarget = new Date().getTime() + 30000;
    let workCycle = true;

    function startTimerWork(){
       setInterval (function() {
            
            const timeNow = new Date().getTime();
            const difference = timeTarget - timeNow;

            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            timerSecs.innerHTML = seconds;
            timerMins.innerHTML = minutes;

            if(difference <= 0){
                ding.play();
                timeTarget = workCycle ? new Date().getTime() + 5000 : new Date().getTime() + 10000;
                workCycle = workCycle ? false : true;
                startTimerWork();
            }

        }, 1000);
    }

    startBtn.addEventListener('click', startTimerWork);
}

window.onload = start;