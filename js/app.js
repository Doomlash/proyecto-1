var playerText = document.getElementById('playerText');
var referenceText = document.getElementById('referenceText').innerHTML;
var timer = document.getElementById('timer');
document.getElementById("resetButton").addEventListener("click", reset); 
playerText.maxLength = referenceText.length;

var startingTime;
var writingTimer
var characterCounter = 0;

reset();

playerText.addEventListener("keyup", checkInput);

function checkInput(keyPressed){
	var playerTextContent = playerText.value;
	if (playerTextContent.length != 0 && timer.innerHTML == "0:00.000"){startTimer();}
	if (playerTextContent == referenceText){stopTimer();}
}

function startTimer(){
	startingTime = new Date();
	writingTimer = setInterval(timerRunning, 10);
}
function stopTimer(){
	clearInterval(writingTimer);
}
function timerRunning(){
	var currentTime = new Date();
	var timeElapsed = new Date(currentTime - startingTime);
	var min = timeElapsed.getUTCMinutes()
    var sec = timeElapsed.getUTCSeconds()
    var ms = timeElapsed.getUTCMilliseconds();
	timer.innerHTML=
		min + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}
function reset(){
	stopTimer();
	timer.innerHTML = "0:00.000";
	playerText.value = '';
}