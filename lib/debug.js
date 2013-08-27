// -------------------------------------------------------------------------------------------------
// lib.debug -
// -------------------------------------------------------------------------------------------------
lib.debug = function(level,css) {
	this.level = level;
	this.logFile = [];
	this.dom = root;
	this.cmd = null;
	this.hidden = true;
	this.mainframe = new lib.mainframe();
};

// -------------------------------------------------------------------------------------------------
// debug.log
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.log = function(ttl,msg,lvl) {
	this.logFile.push({
		title: ttl,
		message: msg,
		level: lvl
	});
	this.refreshLogView();
};

// -------------------------------------------------------------------------------------------------
// debug.refreshLogView
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.refreshLogView = function() {
	var str = "";
	for(var i = this.logFile.length - 1;i >= 0;i--) {
		entry - this.logFile[i];
		if(entry.level <= GM.debug.level) {
			var line = entry.title + " - " + entry.message;
			if(i < 10)
				str += "000" + i;
			else if(i < 100)
				str += "00" + i;
			else if(i < 1000)
				str += "0" + i;
			else
				str += i;
			str += "> " + line + "<br />";
		}
	}
	this.dom.innerHTML = str;
};

// -------------------------------------------------------------------------------------------------
// debug.attachLogView
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.attachLogView = function(root) {
	this.root = root;
	var panel = new ui.panel(this.mainframe);
	panel.setClass("debug");
	
	var f = panel.addForm();
	var cmd = f.createTextField();
	var sub = f.createSubmit("Exec");
	sub.setCallback(this.codeExec);
	var clr = f.createButton("Clear");
	clr.setCallback(this.clearLog);
	var tgl = f.createButton("Toggle");
	tgl.setCallback(this.toggleHideLog);

	var view = new ui.panel();
	
	panel.appendChild(f);
	panel.appendChild(view);
};

// -------------------------------------------------------------------------------------------------
// debug.clearLog
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.clearLog = function() {
	this.logFile = [];
	this.refreshLogView();
};

// -------------------------------------------------------------------------------------------------
// debug.toggleHideLog
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.toggleHideLog = function() {
	if(this.hidden) {
		this.dom.style.display = "block";
		this.hidden = false;
	}
	else {
		this.dom.style.display = "none";
		this.hidden = true;
	}
};

// -------------------------------------------------------------------------------------------------
// debug.codeExec
// -------------------------------------------------------------------------------------------------
lib.debug.prototype.codeExec = function() {
	var cmd = this.cmd.value;
	this.log("MSG: User Exec",cmd,0);
	this.cmd.value = "";
	try {
		eval(cmd);
	}
	catch(exception) {
		this.log("ERROR",exception,0);
	}
};