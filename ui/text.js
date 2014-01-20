ui.text = function(text) {
	ui.base.call(this,"span");
	
	if(typeof text == "object") {
		this.data = text;
		this.refreshView();
	}
	else {
		var t = document.createTextNode(text);
		this.dom.appendChild(t);
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
// setData
// -------------------------------------------------------------------------------------------------
ui.text.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};