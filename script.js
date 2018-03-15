function akarin() {
	let akarin = document.getElementById("akarin");
	let akarinWindow = document.getElementById("window");
	let audio = new Audio('assets/akarin.mp3');
	audio.volume = 0.5;
	audio.play();
	
	if (akarin.style.display == "block") return;
	akarin.style.display = "block";
	akarinWindow.style.display = "none";

	setTimeout(function() {
		akarin.style.top = "-107px";
	}, 1300);
	setTimeout(function() {
		akarin.style.top = "245px";
	}, 3010);
	setTimeout(function() {
		akarin.style.display = "none";
		akarinWindow.style.display = "block";
	}, 4020);
}

function tomato() {
	let audio = new Audio('assets/tomato.mp3');
	audio.volume = 0.5;
	audio.play();
}

function page(page) {
	let content = document.getElementById("content");
	let contentx = document.getElementById("content-"+page);
	content.innerHTML = contentx.innerHTML;
}; page("home");

// site intro

setTimeout(function(){
	document.getElementById("mascot").style.bottom = "5px";
}, 200); 