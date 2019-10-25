function start(){
    const startBtn = document.querySelector('.timer_controls__btn');
    const timerMins = document.querySelector('.timer_minutes');
    const timerSecs = document.querySelector('.timer_seconds');
    const ding = document.querySelector('.timer_audio');
    const title = document.querySelector('title');
    const cyclesNum = document.querySelector('.timer_cycles__num');
    const clearBtn = document.querySelector('.timer_cycles__btn');
    const stopBtn = document.querySelector('.timer_controls__stop');

    let timerInterval;

    if( localStorage.getItem('cycleCount') !== null ){
        cyclesNum.innerHTML = localStorage.getItem('cycleCount');
    }
 
    function startTimer(){
        const kickOffTime = new Date().getTime() + 1500000;
        timer(kickOffTime, true);
    }

    function stopTimer(){
      clearInterval(timerInterval);
      timerSecs.innerHTML = '00';
      timerMins.innerHTML = '00';
    }

    function clearTimer(timer){
        clearInterval(timer);
    }

    function updateCycleCount(){
        if( localStorage.getItem('cycleCount') === null ){
            localStorage.setItem('cycleCount', '1');
            cyclesNum.innerHTML = localStorage.getItem('cycleCount');
        }else{
            const newCount = parseInt(localStorage.getItem('cycleCount')) + 1;
            localStorage.setItem('cycleCount', `${newCount}`);
            cyclesNum.innerHTML = newCount;
        }
    }

    function clearCycles(){
        localStorage.removeItem('cycleCount');
        cyclesNum.innerHTML = '0';
    }


    const timer = (timeTarget, workCycle) => {
        
        timerInterval = setInterval (function() {
        
            const timeNow = new Date().getTime();
            const difference = timeTarget - timeNow;

            let minutes = Math.floor((difference / 1000 / 60) % 60);
            let seconds = Math.floor((difference  / 1000) % 60);

            minutes = minutes <= 9 ? `0${minutes}` : minutes;
            seconds = seconds  <= 9 ? `0${seconds}` : seconds;

            console.log(`Seconds: ${seconds}`);

            timerMins.innerHTML = minutes;
            timerSecs.innerHTML = seconds;
            title.innerHTML = `${minutes}:${seconds}`;

            if( difference <= 0 ){
                clearTimer(timerInterval);
                timerSecs.innerHTML = '--';
                timerMins.innerHTML = '--';
                title.innerHTML = '--:--';
                ding.play();
                if(workCycle){
                    updateCycleCount();
                }
                timeTarget = workCycle ? new Date().getTime() + 300000 : new Date().getTime() +  1500000;
                workCycle = workCycle ? false : true;
                timer(timeTarget, workCycle);
            }
        }, 1000);
    }

    startBtn.addEventListener('click', startTimer);
    clearBtn.addEventListener('click', clearCycles);
    stopBtn.addEventListener('click', stopTimer);
}

window.onload = start;