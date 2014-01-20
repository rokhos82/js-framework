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
// setParent
// -------------------------------------------------------------------------------------------------
ui.text.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
ui.text.prototype.refreshView = function() {
	if(this.data) {
		this.dom.innerHTML = this.data.read();
	}
};

// -------------------------------------------------------------------------------------------------
// addClass
// -------------------------------------------------------------------------------------------------
ui.text.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
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