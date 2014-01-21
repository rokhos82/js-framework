////////////////////////////////////////////////////////////////////////////////////////////////////
// ui
////////////////////////////////////////////////////////////////////////////////////////////////////
var ui = {};

ui.css = {};
ui.setCSSDomain = function(d) { ui.css.domain = d; };
ui.removeCSSDomain = function() { delete ui.css.domain; };

////////////////////////////////////////////////////////////////////////////////////////////////////
// ui.interfaces - Simple interfaces that consist of only functions for classes to borrow from.
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.interfaces = {};
// addPanel ----------------------------------------------------------------------------------------
ui.interfaces.addPanel = function() {};
ui.interfaces.addPanel.prototype.addPanel = function() {
	var p = new ui.panel(this.mainframe);
	this.appendChild(p);
	return p;
};
// addText -----------------------------------------------------------------------------------------
ui.interfaces.addText = function() {};
ui.interfaces.addText.prototype.addText = function(text) {
	var t = new ui.text(text);
	this.appendChild(t);
	return t;
};
// -------------------------------------------------------------------------------------------------
ui.interfaces.addButton = function() {};
ui.interfaces.addButton.prototype.addButton = function(text,link) {
	var b = new ui.button(text);
	b.setCallback(link);
	this.appendChild(b);
	return b;
}
// -------------------------------------------------------------------------------------------------
ui.interfaces.addAnchor = function() {};
ui.interfaces.addAnchor.prototype.addAnchor = function(text,name,href) {
	var a = new ui.anchor(text,name,href);
	this.appendChild(a);
	return a;
};
// -------------------------------------------------------------------------------------------------
ui.interfaces.addFrame = function() {};
ui.interfaces.addFrame.prototype.addFrame = function(title) {
	var f = new ui.frame(title,this.frame);
	this.appendChild(f);
	return f;
};
// -------------------------------------------------------------------------------------------------
ui.interfaces.addTable = function() {};
ui.interfaces.addTable.prototype.addTable = function(title) {
	var t = new ui.table();
	this.appendChild(t);
	return t;
};
// -------------------------------------------------------------------------------------------------
ui.interfaces.addInput = function() {};
ui.interfaces.addInput.;prototype.addInput = function(type,conn) {
	var i = new ui.input(type,conn);
	this.appendChild(i);
	return i;
};


////////////////////////////////////////////////////////////////////////////////////////////////////
// ui.base
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.base = function(elementType) {
	this.css = {};
	this.parent = undefined;
	this.dom = document.createElement(elementType);
	this.dom.ui = this;
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
ui.baseExt = function(elementType,mainframe) {
	ui.base.call(this,elementType);
	this.mainframe = mainframe;
	this.children = new Array();
};
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
// appendChild
// -------------------------------------------------------------------------------------------------
ui.baseExt.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
//
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.label = function(text) {
	ui.base.call(this,"label");
	if(text) { this.dom.appendChild(document.createTextNode(text)); }
};
lib.extend(ui.base,ui.label);