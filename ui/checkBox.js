////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.checkBox = function(label) {
	this.dom = document.createElement("input");
	this.dom.setAttribute("type","checkbox");

	this.dom.svc = this;
	this.dom.setAttribute("onclick","this.svc.updateData();");
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.setParent = function(p) {
	this.parent = p;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.appendChild = function() {
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.refreshView = function() {
	if(this.data) {
		var val = this.data.read();
		if(val)
			this.dom.checked = true;
		else
			this.dom.checked = false;
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.updateData = function() {
	if(this.data) {
		this.data.write(this.dom.checked);
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.setClass = function(klass) {
	this.dom.setAttribute("class",klass);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.checkBox.prototype.setData = function(connector) {
	this.data = connector;
	if(this.data)
		this.refreshView();
};