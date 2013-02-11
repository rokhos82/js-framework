ui.button = function(label,link) {
	this.dom = document.createElement("button");
	this.dom.innerHTML = label;
	this.callback = undefined;
	this.parent = undefined;

	if(link) {
		this.service = link;
		this.dom.svc = this.service;
		this.dom.setAttribute("onclick","this.svc.read();");
	}
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.button.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.button.prototype.setCallback = function(callback) {
	this.service = callback;
	this.dom.svc = this.service;
	this.dom.setAttribute("onclick","this.svc.read();");
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.button.prototype.refreshView = function() {
};

ui.button.prototype.removeChildren = function() {
};