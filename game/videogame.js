var playerChar = document.getElementById("player");
var playerAlive = true;
var playerPos = 5;
var playerHeight = 37;
var playerSpeed = 1;
var score = 0;
var gameover = document.getElementById("gameover");

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 37 || e.keyCode ==  65) {
		//left
		playerSpeed = 1;
		if (playerPos <= 0) { return;}
		playerPos--
		playerChar.style.left = playerPos+"vh"
	}
	if (e.keyCode == 39 || e.keyCode == 68) {
		//right
		if (playerPos >= 68 && playerAlive) { die();}
		playerPos = playerPos + playerSpeed
		playerChar.style.left = playerPos+"vh"
	}
	if (e.keyCode == 27) {
		document.location = "https://pea.moe/";
	}
	if (e.keyCode == 13) {
		document.location = "https://pea.moe/videogame.html";
	}
	if (e.keyCode == 32) {
		rainbowToggle();
	}
})

window.addEventListener("keyup", function(e) {
	if (e.keyCode == 39 || e.keyCode == 68){
		playerSpeed++
		if (playerPos >= 68 && playerAlive) { die();}
	}
})

function die() {
	if (playerHeight > -13) {
		setTimeout(function() {
				playerHeight--
				playerChar.style.bottom = playerHeight+"vh"
				die()
				return;
			gameover.style.opacity = "1";
		}, 20)
		return;
	}
	playerAlive = false;
	gameover.style.opacity = "1";
	score = playerPos - 69;
	updateScore()
}
function updateScore() {
	document.getElementById("score").innerHTML = score;
}

//rainbow

var degree = 0;
var rainbowColorActive = false;
var rainbowColorTimeout = null;
var rainbowStep = 1;

function rainbowColor() {
	if (!rainbowColorActive) {
		clearTimeout(rainbowColorTimeout);
		return;
	}
	if (rainbowStep >= 10) {if (degree >= 36000){degree = 1};}
	else {if (degree >= 360){degree = 1};}
	degree = degree + rainbowStep;
	rainbowColorTimeout = setTimeout("rainbowColor()", 1);
	document.body.style.filter = "hue-rotate("+degree+"deg)";
}

function rainbowSpeed(step) {rainbowStep = step;}

function rainbowToggle() {
	rainbowColorActive = !rainbowColorActive;
	rainbowColor();
}