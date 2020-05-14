var playerText = document.getElementById("playerText");
document.getElementById("referenceText").innerHTML="Imaqtpie, I've noticed in Korea they tend to use a mix of magic and physical damage on Kog Maw. Meanwhile you seem to be using mostly true damage. Which playstyle is better?";
var referenceText = document.getElementById("referenceText").innerHTML;
var timer = document.getElementById("timer");
var ppm = document.getElementById("ppm");
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
	testError();
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
	var playerTextContent = playerText.value;
	ppm.innerHTML = 60*(playerTextContent.length/(sec+min*60))/5
}
function testError(){
	var playerTextContent = playerText.value;
	if (playerTextContent != referenceText.slice(0,playerTextContent.length)){playerText.style.backgroundColor="#ff4d4d";}
	else {playerText.style.backgroundColor="white";}
}
function reset(){
	stopTimer();
	playerText.style.backgroundColor="white";
	timer.innerHTML = "0:00.000";
	playerText.value = '';
	ppm.innerHTML = '0'
}
//Imaqtpie, I've noticed in Korea they tend to use a mix of magic and physical damage on Kog Maw. Meanwhile you seem to be using mostly true damage. Which playstyle is better?