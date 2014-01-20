// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
var ui = {};

ui.css = {};
ui.setCSSDomain = function(d) {
	ui.css.domain = d;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.base = function() {
	this.css = {};
};

ui.base.prototype.setClass = function(klass) {
	var str = null;
	if(typeof klass === "array") {
		str = "";
		for(var i in klass) {
			var s = klass[i];
			if(this.css.domain) { s = this.css.domain + "_" + s; }
			else if (ui.css.domain) { s = ui.css.domain + "_" + s; }
			str += s + " ";
		}
	}
	else if(typeof klass === "string") {
		if(this.css.domain) { str = this.css.domain + "_" + klass; }
		else if(ui.css.domain) { str = ui.css.domain + "_" + klass; }
		else { str = klass; }
	}
	else {
		// Hmmm, neither array nor string.  Return a null.
	}

	if(str) {
		this.dom.setAttribute("class",str);
	}

	return str;
};

ui.base.prototype.setParent = function(p) {
	this.parent = p;
};

ui.base.prototype.setMainframe = function(m) {
	this.mainframe = m;
};

ui.base.prototype.refreshView = function() {
};

ui.base.prototype.setCSSDomain = function(d) {
	this.css.domain = d;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.label = function(text) {
	this.text = text;
	this.dom = document.createElement("span");
	this.dom.innerHTML = text;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.label.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.label.prototype.refreshView = function() {
	// Stub function.  Do nothing.
};