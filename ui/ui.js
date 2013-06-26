// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
var ui = {};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.base = function() {};
ui.base.prototype.setClass = function(klass) {
	var str = null;
	if(typeof klass === "array") {
		str = "";
		for(var i in klass) {
			str += klass[i] + " ";
		}
	}
	else if(typeof klass === "string") {
		str = klass;
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