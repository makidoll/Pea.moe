var playerChar = document.getElementById("player");
var playerPos = 5;
var playerHeight = 37;
var gameover = document.getElementById("gameover");

window.addEventListener("keydown", function(e) {
	if (e.keyCode == 37) {
		//left
		if (playerPos <= 0) { return;}
		playerPos--
		playerChar.style.left = playerPos+"vh"
	}
	if (e.keyCode == 39) {
		//right
		if (playerPos >= 68) { die()}
		playerPos++
		playerChar.style.left = playerPos+"vh"
	}
})

function die() {
	setTimeout(function() {
		if (playerHeight >= -13) {
			playerHeight--
			playerChar.style.bottom = playerHeight+"vh"
			die()
			return;
		}
		gameover.style.opacity = "1";
		setTimeout(function() {
			document.location = "https://pea.moe/";
		}, 1000)
	}, 20)
}