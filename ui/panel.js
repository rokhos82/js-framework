// -------------------------------------------------------------------------------------------------
// ui.panel - this object is a simple div wrapper.  Can have children and CSS classes.  Mainly
// for UI organization.
// -------------------------------------------------------------------------------------------------
ui.panel = function(frame) {
	this.dom = document.createElement("div");
	this.dom.ui = this;
	this.mainframe = frame;
	this.parent = undefined;
	this.children = new Array();
	this.updater = undefined;
	this.classes = new Array();
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.setParent = function(p) {
	this.parent = p;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.setMainframe = function(m) {
	this.mainframe = m;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
};

// -------------------------------------------------------------------------------------------------
// addTextField
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addTextField = function(label,conn,ro) {
	var tf = new ui.textField(label,conn,ro);
	this.appendChild(tf);
	return tf;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addButton = function(label,link) {
	var btn = new ui.button(label);
	btn.setCallback(link);
	this.appendChild(btn);
	return btn;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addPanel = function(title) {
	var p = new ui.panel(title,this.mainframe);
	this.appendChild(p);
	return p;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addRadioSet = function(group) {
	var rs = new ui.radioSet(group);
	this.appendChild(rs);
	return rs;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addComboBox = function(label,options,data) {
	var combo = new ui.comboBox(label);
	combo.addOptions(options);
	if(data) {
		combo.setData(data);
		combo.refreshView();
	}
	this.appendChild(combo);
	
	return combo;
};

// -------------------------------------------------------------------------------------------------
// addPopup
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addPopup = function(klass,overlay) {
	var p = new ui.popup(klass,overlay);
	this.appendChild(p);
	return p;
};

// -------------------------------------------------------------------------------------------------
// addTable
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addTable = function() {
	var t = new ui.table();
	this.appendChild(t);
	return t;
};

// -------------------------------------------------------------------------------------------------
// addAnchor
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addAnchor = function(name,text,href) {
	var a = new ui.anchor(name,text,href);
	this.appendChild(a);
	return a;
};

// -------------------------------------------------------------------------------------------------
// addList
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addList = function() {
	var l = new ui.list();
	this.appendChild(l);
	return l;
};

// -------------------------------------------------------------------------------------------------
// addText
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addText = function(text) {
	var t = new ui.text(text);
	this.appendChild(t);
	return t;
};

// -------------------------------------------------------------------------------------------------
// addTextArea
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addTextArea = function(data) {
	var ta = new ui.textArea(data);
	this.appendChild(ta);
	return ta;
}

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.refreshView = function() {
	if(this.titleData)
		this.title.innerHTML = this.titleData.read();

	for(var c in this.children) {
		this.children[c].refreshView();
	}
};

// -------------------------------------------------------------------------------------------------
// removeChildren - remove all of the children of this ui object
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.removeChildren = function() {
	for(var c in this.children) {
		this.children[c].removeChildren();
		this.dom.removeChild(this.children[c].dom);
		delete this.children[c];
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.removeChild = function(obj) {
	for(var c in this.children) {
		var child = this.children[c];
		if(obj === child) {
			delete this.children[c];
			this.dom.removeChild(obj.dom);
			break;
		}
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.destroy = function() {
	this.removeChildren();
	this.parent.removeChild(this.dom);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.setTitle = function(t) {
	this.title.innerHTML = t;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.setTitleData = function(t) {
	this.titleData = t;
	if(t)
		this.refreshView();
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addCheckBox = function(label) {
	var div = document.createElement("div");
	var xb = new ui.checkBox();
	if(label) {
	}
};