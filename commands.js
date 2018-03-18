//terminal by maki https://maki.cat/
var username = ""
var commands = {
	"help": {
		desc: "Shows this page",
		action: function(c) {
			c.print("Here are the commands you can use:");
			for (var i=0; i<Object.keys(commands).length; i++) {
				let key = Object.keys(commands)[i];
				if (commands[key].hidden) continue;
				let usage = (commands[key].usage)? " "+commands[key].usage.trim(): "";
				let desc = (commands[key].desc)? commands[key].desc.trim(): "";
				c.print("    "+key+usage+": "+commands[key].desc);
			}
		}
	},
	"echo": {
		hidden: true,
		action: function(c) {
			if (!c.msg.trim()) {
				c.print("You didnt specify a message! Try \"echo (msg)\"");
				return;
			}

			c.print(c.msg);
		}
	},
	"clear": {
		desc: "Clears the terminal",
		action: function(c) {
			c.clear();
		}
	},
	"name": {
		desc: "set your name",
		usage: "(name)",
		action: function(c) {
			username = c.msg.trim();
			if (!username) { 
				c.print("What's your name?");
				terminalInput("name "); return;
			}
			c.print("Nice to meet you, "+username+"!")
		}
	},
	"msg": {
		alias: ["message"],
		desc: "Send a message to me!!!!",
		usage: "(message)",
		action: function(c) {
			if (!username) { 
				c.exec("name"); return;
			}
			if (!c.msg) {
				c.print("What's your message?");
				terminalInput("msg "); return;
			}
			let img = document.createElement("div");
			img.style.backgroundImage = "url(https://maki.cat/discord-message?to=pea&name="+escape(username)+"&message="+escape(c.msg)+")";
			document.body.appendChild(img);
			setTimeout(function() { document.body.removeChild(img) }.bind(img), 8000);
			c.print("Your message might have been sent!");
		}
	},
	"rainbow": {
		desc: "Toggles rainbow mode",
		action: function(c) {
			rainbowToggle();
			if (!rainbowColorActive) {
				c.print("rainbow mode off :("); return;
			}
			c.print("COLORS!!!");
		}
	},
	"color": {
		desc: "Change the color",
		usage: "(0-360)",
		action: function(c) {
			hueCommand(c.msg);
			c.print("color set to "+c.msg+" degrees");
		}		
	},
	"animations": {
		desc: "lists animations you can play",
		alias: ["animation"],
		action: function(c) {
			c.print("here is a list of animations you can play")
			c.print("    playall: Plays all animations at once");
			c.print("    akarin: Plays akarin");
			c.print("    tomato: Plays tomato");
			c.print("    ayano: Plays ayano");
		}
	},
	"dumb": {
		desc: "lists dumb commands",
		alias: ["dumbstuff"],
		action: function(c) {
			c.print("here is a list of dumb shit")
			c.print("    coinflip: flips a coin");
			c.print("    8ball: the all knowing 8ball in electric form. it is never wrong");
			c.print("    fortune: tells you your fortune");
			c.print("    flirt: flirts with the user");
			c.print("    lewd: lewds the user");
			c.print("    insult: insults the user");
			c.print("    lart: larts the user");
			c.print("    kill: kills the user");
		}
	},
	"playall": {
		hidden: true,
		action: function(c) {
			akarin(); tomato(); door();
			c.print("I hope you're not wearing headphones");

		}
	},
	"akarin": {
		hidden: true,
		action: function(c) {
			akarin();
			c.print("AKARIN!");
			setTimeout(function() {
				c.print("HI!!!")
			}, 1700);
		}
	},
	"tomato": {
		hidden: true,
		action: function(c) {
			tomato();
			c.print("TOMATO!");

		}
	},
	"ayano": {
		hidden: true,
		action: function(c) {
			door();
			c.print("TOSHINOU KYOUKO!");
		}
	},
	"hello": {
		alias: ["hi", "hey"],
		hidden: true,
		action: function(c) {
			if (!username == ""){
				let result = ['Hello ', 'Hey ', 'hi '][Math.floor(Math.random() * 3)];
				c.print(result+username+"!");
				return;
			}
			let result = ['Hello!', 'Hey cutie!', 'hi!'][Math.floor(Math.random() * 3)];
			c.print(result);
			c.exec("name");
		}
	},
	"same": {
		hidden: true,
		action: function(c) {
			if (Math.floor((Math.random() * 5) + 1) > 1){
				c.print("same"); return;
			}
			c.print("butts");
		}
	},
	"toast": {
		alias: ["burnttoast"],
		hidden: true,
		action: function(c) {
			c.print("Toast is a cutie <3");
		}
	},
	"coinflip": {
		hidden: true,
		desc: "flips a coin",
		action: function(c) {
			let result = ['heads', 'tails'][Math.floor(Math.random() * 2)];
			c.print(result);
		}
	},
	"8ball": {
		hidden: true,
		desc: "the all knowing 8ball in electric form. it is never wrong",
		usage: "(question)",
		action: function(c) {
			let result = vars.eightball[Math.floor(Math.random() * vars.eightball.length)];
			c.print(result);
		}
	},
	"fortune": {
		hidden: true,
		desc: "Tells you your fortune",
		action: function(c) {
			let result = vars.fortune[Math.floor(Math.random() * vars.fortune.length)];
			c.print(result);
		}
	},
	"lewd": {
		hidden: true,
		desc: "lewds the user",
		action: function(c) {
			let result = vars.lewd[Math.floor(Math.random() * vars.lewd.length)];
			if (!username == ""){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},	
	"insult": {
		hidden: true,
		desc: "Insults the user",
		action: function(c) {
			let result = vars.insult[Math.floor(Math.random() * vars.insult.length)];
			c.print(result);
		}
	},
	"flirt": {
		hidden: true,
		desc: "Flirts with the user",
		action: function(c) {
			let result = vars.flirt[Math.floor(Math.random() * vars.flirt.length)];
			c.print(result);
		}
	},
	"lart": {
		hidden: true,
		desc: "larts the user",
		action: function(c) {
			let result = vars.lart[Math.floor(Math.random() * vars.lart.length)];
			if (username){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},	
	"kill": {
		hidden: true,
		desc: "kills the user",
		action: function(c) {
			let result = vars.kill[Math.floor(Math.random() * vars.kill.length)];
			if (!username == ""){
				c.print(result.replace(/\[username\]/gi, username)); return;
			}
			c.print("You have to set a name first!");
			c.exec("name");
		}
	},	
}

var terminal = new Term({
	id: "term",
	motd: [
		"Welcome!",
		"Type \"help\" for a list of commands.",
		"Type \"name (your name)\" to tell me your name!"
	],
	error: "Command not found! Try \"help\"",
	cmds: (function() {
		let obj = {};
		for (var i=0; i<Object.keys(commands).length; i++) {
			let key = Object.keys(commands)[i];
			if (commands[key].alias) {
				for (var j=0; j<commands[key].alias.length; j++) {
					obj[commands[key].alias[j]] = commands[key].action;
				}
			}
			obj[key] = commands[key].action;
		}; return obj;    
	})()
});

terminal.spawn();