var playerText = document.getElementById('playerText');
var referenceText = document.getElementById('referenceText').innerHTML;
playerText.maxLength=referenceText.length;
playerText.value = '';

var startingTime;
var characterCounter = 0;
var timer=document.getElementById('timer');

playerText.addEventListener("keydown", checkInput);

function checkInput(keyPressed){
	var playerTextContent = playerText.value;
	if(playerTextContent.length==0&&timer.innerHTML=="0:00.000"){startTimer();}
}

function startTimer(){
	startingTime= new Date();
	writingTimer = setInterval(timerRunning, 10);
}
function stopTimer(){
	clearInterval(writingTimer);
}
function timerRunning(){
	var currentTime = new Date();
	var timeElapsed= new Date(currentTime-startingTime);
	var min = timeElapsed.getUTCMinutes()
    var sec = timeElapsed.getUTCSeconds()
    var ms = timeElapsed.getUTCMilliseconds();
	timer.innerHTML=
		min + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
}