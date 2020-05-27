//seteando las variables y los elementos
var playerText = document.getElementById("playerText");
var referenceText = document.getElementById("referenceText");
var textSelector = document.getElementById("textSelector")
var timer = document.getElementById("timer");
var ppm = document.getElementById("ppm");
var startingTime;
var writingTimer;
var bgColor = "white"
var fontColor = "black"
reset();

initBotones();
initScores();
initSelector();
initPlayerText();
initReferenceText();
checkForNightTheme();


//funciones
function initBotones(){
	document.getElementById("resetButton").addEventListener("click", reset); 
	document.getElementById("nightButton").addEventListener("click", changeTheme); 
	document.getElementById("scoreButton").addEventListener("click", function(){
		localStorage.bestPpm = "0.00";
		document.getElementById("bestPpm").innerHTML = "Mejor ppm: " + localStorage.bestPpm;
		localStorage.lastPpm = "0.00";
		document.getElementById("lastPpm").innerHTML = "Ultimo ppm: " + localStorage.lastPpm;	
	}); 
}

function initScores(){
	if(!localStorage.bestPpm){
		localStorage.bestPpm = "0.00";
	}
	document.getElementById("bestPpm").innerHTML = "Mejor ppm: " + localStorage.bestPpm;
	if(!localStorage.lastPpm){
		localStorage.lastPpm = "0.00";
	}
	document.getElementById("lastPpm").innerHTML = "Ultimo ppm: " + localStorage.lastPpm;
}

function saveScore(){
	if(parseFloat(localStorage.bestPpm)<parseFloat(ppm.innerHTML)){
		localStorage.bestPpm = ppm.innerHTML;
		document.getElementById("bestPpm").innerHTML = "Mejor ppm: " + localStorage.bestPpm;
	}
	localStorage.lastPpm = ppm.innerHTML;
	document.getElementById("lastPpm").innerHTML = "Ultimo ppm: " + localStorage.lastPpm;
	
}

function initSelector(){
	textSelector.selectedIndex = 0;
	textSelector.addEventListener("change", function() {
		if(textSelector.options[0].value == "default"){
			textSelector.options[0] = null;
		}
		playerText.disabled = false;
		playerText.focus();
		setReferenceText(textSelector.value);
		reset();
	});
}

function initPlayerText(){
	playerText.disabled = true;
	playerText.addEventListener("keypress", function(){
		var playerTextContent = playerText.value;
		if (timer.innerHTML == "0:00.000"){startTimer();}
	});
}

function initReferenceText(){
	sessionStorage.testText = "test";
	sessionStorage.avatarText = "Agua, tierra, fuego, aire. Hace muchos años, las cuatro naciones vivían en armonía, pero todo cambió cuando la Nación del Fuego atacó. Solo el Avatar, maestro de los cuatro elementos, podía detenerlos. Pero cuando el mundo más lo necesitaba, desapareció.";
	sessionStorage.trabalenguasText = "Tres tristes tigres tragaban trigo en un trigal, sentados tras un trigal, en tres tristes trastos, tragaban trigo, tres tristes tigres.";
	sessionStorage.copypastaText = "Imaqtpie, I've noticed in Korea they tend to use a mix of magic and physical damage on Kog Maw. Meanwhile you seem to be using mostly true damage. Which playstyle is better?";
}

function setReferenceText(name){
	referenceText.style.display= "initial";
	referenceText.innerHTML = sessionStorage.getItem(name);
	playerText.maxLength = sessionStorage.getItem(name).length;
}

function checkForNightTheme(){
	if(localStorage.nightTheme){
		if(localStorage.nightTheme == "1"){
			changeTheme();
		}
	}
	else{
		localStorage.nightTheme = "0";
	}
}

function changeTheme(){
	if(bgColor=="white"){
		localStorage.nightTheme = "1";
	}
	else{
		localStorage.nightTheme = "0";
	}
	//cambio de los colores
	var auxForSwitch = bgColor;
	bgColor = fontColor;
	fontColor = auxForSwitch;
	//elementos a actualizar
	document.getElementsByTagName("body")[0].style.backgroundColor = bgColor;
	playerText.style.color = fontColor;
	document.getElementById("referenceText").style.color = fontColor;
	timer.style.color = fontColor;
	ppm.style.color = fontColor;
	playerText.style.backgroundColor = bgColor;
	document.getElementById("tiempoHeader").style.color = fontColor;
	document.getElementById("ppmHeader").style.color = fontColor;
	document.getElementById("bestPpm").style.color = fontColor;
	document.getElementById("lastPpm").style.color = fontColor;
}

function checkInput(){
	testError();
	if (playerText.value == referenceText.innerHTML){
		stopTimer();
		saveScore();
	}
}

function testError(){
	var playerTextContent = playerText.value;
	if (playerTextContent != referenceText.innerHTML.slice(0,playerTextContent.length)){playerText.style.backgroundColor="#ff4d4d";}
	else {playerText.style.backgroundColor=bgColor;}
}

function reset(){
	stopTimer();
	playerText.style.backgroundColor=bgColor;
	timer.innerHTML = "0:00.000";
	playerText.value = '';
	ppm.innerHTML = '0.00';
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
	var min = timeElapsed.getUTCMinutes();
    var sec = timeElapsed.getUTCSeconds();
    var ms = timeElapsed.getUTCMilliseconds();
	timer.innerHTML=
		min + ":" + 
        (sec > 9 ? sec : "0" + sec) + "." + 
        (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
	var playerTextContent = playerText.value;
	var ppmValue = 60*(playerTextContent.length / (Math.round(ms/200) + sec*5 + min*60*5 ))
	ppm.innerHTML = (Math.round(ppmValue*100)/100).toFixed(2);
	checkInput();
}