// -------------------------------------------------------------------------------------------------
// ui.panel - this object is a simple div wrapper.  Can have children and CSS classes.  Mainly
// for UI organization.
// -------------------------------------------------------------------------------------------------
ui.panel = function(frame) {
	ui.baseExt.call(this,"div",frame);
};
lib.extend(ui.baseExt,ui.panel);
lib.borrow(ui.interfaces.addAnchor,ui.panel);
lib.borrow(ui.interfaces.addButton,ui.panel);
lib.borrow(ui.interfaces.addFrame,ui.panel);
lib.borrow(ui.interfaces.addPanel,ui.panel);
lib.borrow(ui.interfaces.addText,ui.panel);

// -------------------------------------------------------------------------------------------------
// exists for legacy support only.  will be removed.
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addClass = function(klass) {
	this.setClass(klass);
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
// addRadioSet
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addRadioSet = function(group) {
	var rs = new ui.radioSet(group);
	this.appendChild(rs);
	return rs;
};

// -------------------------------------------------------------------------------------------------
// addComboBox
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
// addList
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addList = function() {
	var l = new ui.list();
	this.appendChild(l);
	return l;
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

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.panel.prototype.addForm = function() {
	var frm = new ui.form();
	this.appendChild(frm);
	return frm;
};