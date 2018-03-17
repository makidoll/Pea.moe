//terminal by maki https://maki.cat/
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
		desc: "Echo message to the user",
		usage: "(msg)",
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
	"rainbow": {
		desc: "Toggles rainbow mode",
		action: function(c) {
			rainbowToggle();
			if (!rainbowColorActive) {
				c.print("rainbow mode off :(");
			}
			else {
				c.print("COLORS!!!");
			}
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
			let result = ['Hello!', 'Hey cutie', 'hi!'][Math.floor(Math.random() * 3)];
			c.print(result);
		}
	},
	"same": {
		hidden: true,
		action: function(c) {
			if (Math.floor((Math.random() * 5) + 1) > 1){
				c.print("same");
			}
			else {
				c.print("butts");
			}
		}
	},
	"coinflip": {
		hidden: true,
		action: function(c) {
			let result = ['heads', 'tails'][Math.floor(Math.random() * 2)];
			c.print(result);
		}
	},
	"toast": {
		alias: ["burnttoast"],
		hidden: true,
		action: function(c) {
			c.print("Toast is a cutie <3");
		}
	},
	"8ball": {
		desc: "the all knowing 8ball in electric form. it is never wrong",
		usage: "(question)",
		action: function(c) {
			let result = [
				"As I see it, yes",
				"It is certain",
				"It is decidedly so",
				"Most likely",
				"Outlook good",
				"Signs point to yes",
				"One would be wise to think so",
				"Naturally",
				"Without a doubt",
				"Yes",
				"Yes, definitely",
				"You may rely on it",
				"Reply hazy, try again",
				"Ask again later",
				"Better not tell you now",
				"Cannot predict now",
				"Concentrate and ask again",
				"You know the answer better than I",
				"Maybe...",
				"You're kidding, right?",
				"Don't count on it",
				"In your dreams",
				"My reply is no",
				"My sources say no",
				"Outlook not so good",
				"Very doubtful"
			][Math.floor(Math.random() * 26)];
			c.print(result);
		}
	},
}

var terminal = new Term({
	id: "term",
	motd: "Type \"help\" for a list of commands.",
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