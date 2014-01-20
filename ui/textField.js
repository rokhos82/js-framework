ui.textField = function(label,data,ro) {
	ui.base.call(this,"div");
	if(label) {
		var	l = document.createElement("label");
		l.innerHTML = label;
		this.label = l;
		this.dom.appendChild(l);
	}
	var i = document.createElement("input");
	i.setAttribute("type","text");
	this.dom.appendChild(i);
	this.field = i;
	this.field.svc = this;
	this.parent = undefined;
	this.setData(data);
	this.setReadOnly(ro);
	
	this.field.setAttribute("onblur","this.svc.updateData();");
};
lib.extend(ui.base,ui.textField);

// -------------------------------------------------------------------------------------------------
// setData - takes 1 parameter: connector.  This must be an object with a read and a write method.
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};

// -------------------------------------------------------------------------------------------------
// setUpdate
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

// -------------------------------------------------------------------------------------------------
// setReadOnly
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setReadOnly = function(ro) {
	if(ro) {
		this.field.setAttribute("readonly","readonly");
	}
	else {
		this.field.removeAttribute("readonly");
	}
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.refreshView = function() {
	if(this.data)
		this.field.value = this.data.read();
		
	if(this.labelData)
		this.label.innerHTML = this.labelData.read();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.updateData = function() {
	this.data.write(this.field.value);
	if(this.service)
		this.func.apply(this.service,this.arg);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setTabIndex = function(index) {
	this.field.setAttribute("tabindex",index);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.getValue = function() {
	return this.field.value;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.getData = function() {
	return this.data;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.focus = function() {
	this.field.focus();
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setLabel = function(l) {
	this.label.innerHTML = l;
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.textField.prototype.setLabelData = function(l) {
	this.labelData = l;
	if(l)
		this.refreshView();
};