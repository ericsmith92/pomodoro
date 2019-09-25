function start(){
    const startBtn = document.querySelector('.timer_controls__btn');
    const timerMins = document.querySelector('.timer_minutes');
    const timerSecs = document.querySelector('.timer_seconds');
    const ding = document.querySelector('.timer_audio');
    const title = document.querySelector('title');

    //let timeTarget = 
    //let workCycle = true;

    function startTimer(){
        const kickOffTime = new Date().getTime() + 1500000;
        timer(kickOffTime, true);
    }

    const timer = (timeTarget, workCycle) => {
       setInterval (function() {
            
            const timeNow = new Date().getTime();
            const difference = timeTarget - timeNow;

            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            console.log(typeof minutes);

            timerSecs.innerHTML = seconds  <= 9 ? `0${seconds}` : seconds;
            timerMins.innerHTML = minutes <= 9 ? `0${minutes}` : minutes;
            title.innerHTML = `${minutes}:${seconds}`;

            if(difference <= 0){
                clearInterval(timer);
                timerSecs.innerHTML = '--';
                timerMins.innerHTML = '--';
                title.innerHTML = '--:--';
                ding.play();
                timeTarget = workCycle ? new Date().getTime() + 300000 : new Date().getTime() +  1500000;
                workCycle = workCycle ? false : true;
                timer(timeTarget, workCycle);
            }

        }, 1000);
    }

    startBtn.addEventListener('click', startTimer);
}

window.onload = start;