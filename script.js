function akarin() {
	let ele = document.getElementById("akarin");
	let audio = new Audio('assets/akarin.mp3');
	audio.play();
	
	if (ele.style.display == "block") return;
	ele.style.display = "block";
	
	setTimeout(function() {
		ele.style.top = "-107px";
	}, 1300);
	setTimeout(function() {
		ele.style.top = "245px";
	}, 3010);
	setTimeout(function() {
		ele.style.display = "none";
	}, 4020);
}

function tomato() {
	let audio = new Audio('assets/tomato.mp3');
	audio.volume = 0.1;
	audio.play();
}