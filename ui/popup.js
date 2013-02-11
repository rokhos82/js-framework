ui.popup = function(klass,overlay) {
	this.dom = document.createElement("div");
	this.overlay = document.createElement("div");
	this.dom.appendChild(this.overlay);
	this.children = new Array();
	this.classes = new Array();
	this.dat = {};

	if(klass)
		this.addClass(klass);

	if(overlay)
		this.setOverlayClass(overlay);
};

ui.popup.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.popup.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

ui.popup.prototype.show = function() {
	this.dom.style.display = "block";
	this.overlay.style.display = "block";
};

ui.popup.prototype.hide = function() {
	this.dom.style.display = "none";
	this.overlay.style.display = "none";
};

ui.popup.prototype.addForm = function(title) {
	var f = new ui.form(title);
	this.appendChild(f);
	return f;
};

ui.popup.prototype.addPanel = function(title) {
	var p = new ui.panel(title);
	this.appendChild(p);
	return p;
};

ui.popup.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
};

ui.popup.prototype.refreshView = function() {
};

ui.popup.prototype.setOverlayClass = function(klass) {
	this.overlay.setAttribute("class",klass);
};