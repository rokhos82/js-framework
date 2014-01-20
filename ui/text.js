ui.text = function(text) {
	ui.base.call(this);
	this.dom = document.createElement("span");
	if(typeof text == "object") {
		this.data = text;
		this.refreshView();
	}
	else {
		this.dom.innerHTML = text;
	}
};
lib.extend(ui.base,ui.text);

// -------------------------------------------------------------------------------------------------
// addClass
// -------------------------------------------------------------------------------------------------
ui.text.prototype.addClass = function(klass) {
	this.setClass(klass);
};

// -------------------------------------------------------------------------------------------------
// removeChildren
// -------------------------------------------------------------------------------------------------
ui.text.prototype.removeChildren = function() {
};

// -------------------------------------------------------------------------------------------------
// setData
// -------------------------------------------------------------------------------------------------
ui.text.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};