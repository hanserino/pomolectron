/*
    Pomolectron
    
    description: A JavaScript pomodoro timer desktop application
    
    author: Hans Kristian Smedsrød
    version: 1.0

*/

var duration = {};
var pomodoroMin = 25;

duration.min = pomodoroMin;
duration.sec = 0;

var timeTextObject = document.querySelector('.duration__time');
var unitTextObject = document.querySelector('.duration__unit');
var startButton = document.querySelector('.start-button');
var body = document.body;

startButton.addEventListener('click', knappetrykkFunksjon);

function knappetrykkFunksjon(event){

    //Skjule knappen etter at den er trykket på
    startButton.classList.add('hidden');
    unitTextObject.classList.add('hidden');

    body.classList.add('active');

    // Start interval timer
    var intervalObj = setInterval(handleInterval, 1000);

    function handleInterval(){
        
        if(duration.min == 0 && duration.sec == 0){

            clearInterval(intervalObj);
            playAlarm("GRATTIS!!!");
        } else{
            
            countDown();   
            showDuration();
        }
    }
}

// Nedtellingsfunksjon
function countDown(){    
    duration.sec = duration.sec - 1;
   
    if(duration.sec < 0){
        duration.min = duration.min - 1;
        duration.sec = 59;
    }
    console.log(duration);   
}

function showDuration(){

    var min = duration.min;
    var sec = duration.sec;

    if(min < 10) {
        min = '0' + min;
    }
    if(sec < 10) {
        sec = '0' + sec;
    }

    timeTextObject.textContent = min +':'+ sec;
}

function playAlarm(text){
    timeTextObject.textContent = text;
    setTimeout(resetClock, 3000);
}

function resetClock(){
    
    duration.min = pomodoroMin;
    timeTextObject.textContent = duration.min;
    
    startButton.classList.remove('hidden');
    unitTextObject.classList.remove('hidden');
    body.classList.remove('active');   
}