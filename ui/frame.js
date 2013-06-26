// -------------------------------------------------------------------------------------------------
// ui.frame - this object is a simple fieldset wrapper.
// -------------------------------------------------------------------------------------------------
ui.frame = function(title,frame) {
	this.dom = document.createElement("fieldset");
	this.title = document.createElement("legend");
	this.title.innerHTML = title;
	this.dom.appendChild(this.title);
	this.dom.ui = this;
	this.mainframe = frame;
	this.parent = undefined;
};

lib.extend(ui.base,ui.frame);

ui.frame.prototype.setParent = function(p) {
	this.parent = p;
};

ui.frame.prototype.setMainframe = function(m) {
	this.mainframe = m;
};