////////////////////////////////////////////////////////////////////////////////////////////////////
// ui
////////////////////////////////////////////////////////////////////////////////////////////////////
var ui = {};

ui.css = {};
ui.setCSSDomain = function(d) { ui.css.domain = d; };
ui.removeCSSDomain = function() { delete ui.css.domain; };

////////////////////////////////////////////////////////////////////////////////////////////////////
// ui.base
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.base = function() {
	this.css = {};
	this.parent = undefined;
	this.children = new Array();
};

// -------------------------------------------------------------------------------------------------
// setCLass
// -------------------------------------------------------------------------------------------------
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

// -------------------------------------------------------------------------------------------------
// setParent
// -------------------------------------------------------------------------------------------------
ui.base.prototype.setParent = function(p) {
	this.parent = p;
};

// -------------------------------------------------------------------------------------------------
// setMainframe
// -------------------------------------------------------------------------------------------------
ui.base.prototype.setMainframe = function(m) {
	this.mainframe = m;
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
ui.base.prototype.refreshView = function() {
};

// -------------------------------------------------------------------------------------------------
// setCSSDomain
// -------------------------------------------------------------------------------------------------
ui.base.prototype.setCSSDomain = function(d) {
	this.css.domain = d;
};

// -------------------------------------------------------------------------------------------------
// setRoot
// -------------------------------------------------------------------------------------------------
ui.base.prototype.setRoot = function(r) {
	this.root = r;
	this.root.appendChild(this.dom);
}

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
ui.base.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

// -------------------------------------------------------------------------------------------------
// removeChildren
// -------------------------------------------------------------------------------------------------
ui.base.prototype.removeChildren = function() {
};

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
ui.base.prototype.destroy = function() {
	for(var o in this) {
		var obj = this[o];
		if(typeof obj == "object" && obj.destory) { obj.destroy(); delete this[o]; }
		else { delete this[o]; }
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// ui.baseExt
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.baseExt = function(mainframe) {
	ui.base.call(this);
	this.mainframe = mainframe;
}
lib.extend(ui.base,ui.baseExt);

// -------------------------------------------------------------------------------------------------
// destroy
// -------------------------------------------------------------------------------------------------
ui.baseExt.prototype.destroy = function() {
	ui.base.prototype.destroy(this);
	this.removeChildren();
};

// -------------------------------------------------------------------------------------------------
// removeChildren
// -------------------------------------------------------------------------------------------------
ui.baseExt.prototype.removeChildren = function() {
	ui.base.prototype.removeChildren.call(this);
	for(var c in this.children) {
		if(this.children[c].removeChildren) { this.children[c].removeChildren(); }
		this.dom.removeChild(this.children[c].dom);
		delete this.children[c];
	}
};

// -------------------------------------------------------------------------------------------------
// addPanel
// -------------------------------------------------------------------------------------------------
ui.baseExt.prototype.addPanel = function() {
	var p = new ui.panel(this.mainframe);
	this.appendChild(p);
	return p;
};

// -------------------------------------------------------------------------------------------------
// addText
// -------------------------------------------------------------------------------------------------
ui.baseExt.prototype.addText = function(text) {
	var t = new ui.text(text);
	this.appendChild(t);
	return t;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////
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