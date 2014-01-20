ui.form = function(title,target,frame) {
	ui.baseExt.call(this,"form");
	this.target = "";
	this.updater = undefined;
};
lib.extend(ui.baseExt,ui.form);
lib.borrow(ui.interfaces.addButton,ui.form);

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.setTarget = function(tar) {
	this.target = tar;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.setUpdater = function(up) {
	this.updater = up;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.addTextField = function(label,conn,ro) {
	var tf = new ui.textField(label,conn,ro);
	this.appendChild(tf);
	return tf;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.addComboBox = function(label,options,data) {
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
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.addTable = function() {
	var t = new ui.table();
	this.appendChild(t);
	if(this.updater)
		t.setUpdater(this.updater);
	return t;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.destroy = function() {
	this.parent.removeChild(this.dom);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.addClass = function(klass) {
	this.setClass(klass);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.refreshView = function() {
	for(var c in this.children) {
		this.children[c].refreshView();
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.form.prototype.addSubmit = function(label,link) {
	var s = new ui.button(label);
	s.setCallback(link);
	this.appendChild(s);
	return s;
};