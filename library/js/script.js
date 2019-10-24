function start(){
    const startBtn = document.querySelector('.timer_controls__btn');
    const timerMins = document.querySelector('.timer_minutes');
    const timerSecs = document.querySelector('.timer_seconds');
    const ding = document.querySelector('.timer_audio');
    const title = document.querySelector('title');
 
    function startTimer(){
        //const kickOffTime = new Date().getTime() + 1500000;
        const kickOffTime = new Date().getTime() + 20000;
        timer(kickOffTime, true);
    }

    let eric = null;

    const timer = (timeTarget, workCycle) => {
        
       eric = setInterval (function() {
        
        const timeNow = new Date().getTime();
        const difference = timeTarget - timeNow;
        console.log(difference);
        if(difference <= 0){
            console.log('fired');
            clearInterval(eric);
            timerSecs.innerHTML = '--';
            timerMins.innerHTML = '--';
            title.innerHTML = '--:--';
            ding.play();
            //timeTarget = workCycle ? new Date().getTime() + 300000 : new Date().getTime() +  1500000;
            timeTarget = workCycle ? new Date().getTime() + 10000 : new Date().getTime() +  20000;
            workCycle = workCycle ? false : true;
            timer(timeTarget, workCycle);
        }
            
            
            let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((difference % (1000 * 60)) / 1000);

            minutes = minutes <= 9 ? `0${minutes}` : minutes;
            seconds = seconds  <= 9 ? `0${seconds}` : seconds;

            timerMins.innerHTML = minutes;
            timerSecs.innerHTML = seconds;
            title.innerHTML = `${minutes}:${seconds}`;

        }, 1000);
    }

    startBtn.addEventListener('click', startTimer);
}

window.onload = start;