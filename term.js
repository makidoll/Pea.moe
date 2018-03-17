var Term = function(obj) {
	obj = (obj)? obj: {};
	this.cmds = (obj.cmds)? obj.cmds: {};
	this.error = (obj.error)? obj.error: "Command not found!";
	this.parent = (obj.id)? document.getElementById(obj.id): document.body;

	// elements for term
	this.child = {
		output: document.createElement("p"),
		input: document.createElement("input")
	}

	// set child properties
	this.child.output.style.overflowY = "auto";
	this.child.output.style.whiteSpace = "pre";
	this.child.input.autoComplete = "off";

	// term functions
	this.charify = function(msg) {
		return msg.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
			return "&#"+i.charCodeAt(0)+";";
		});
	}

	this.bold = function(msg) {
		return "<span style='font-weight: bold;'>"+msg+"</span>";
	}

	this.color = function(msg, col) {
		return "<span style='color: "+col+";'>"+msg+"</span>";
	}

	this.print = function(msg) {
		document.createElement("p")
		//this.child.output.innerHTML += this.charify(msg)+"\n";
		this.child.output.innerHTML += "> "+msg+"\n";
		this.child.output.scrollTop = this.child.output.scrollHeight;
	}

	if (obj.motd) this.print(obj.motd);

	// set child events
	this.child.input.addEventListener("keyup", function(e) {
		if (e.keyCode == 13) { // enter
			try {
				let cmd = this.child.input.value.split(" ")[0];
				this.cmds[cmd]({
					// remember these!
					print: this.print.bind(this),
					msg: this.child.input.value.slice(cmd.length+1),
					clear: function() { this.child.output.innerHTML = "" }.bind(this),
					bold: this.bold,
					color: this.color
				});
			} catch(err) {
				this.print(this.error);
				console.log(err);
			}

			this.child.input.value = "";
		}
	}.bind(this));

	this.spawn = function() {
		// add to parent
		this.parent.appendChild(this.child.output);
		this.parent.appendChild(document.createElement("br"));
		this.parent.appendChild(this.child.input);
	}
}