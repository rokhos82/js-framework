ui.comboBox = function(label) {
	this.dom = document.createElement("div");
	var l = document.createElement("label");
	l.innerHTML = label;
	this.dom.appendChild(l);
	this.select = document.createElement("select");
	this.select.svc = this;
	this.select.setAttribute("onchange","this.svc.updateData();");
	this.dom.appendChild(this.select);
	this.options = new Array();
	this.parent = undefined;
};

// -------------------------------------------------------------------------------------------------
// setParent
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// setData
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setData = function(data) {
	this.data = data;
};

// -------------------------------------------------------------------------------------------------
// addOptions
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.addOptions = function(options) {
	for(var o in options) {
		var opt = document.createElement("option");
		opt.value = o;
		opt.innerHTML = options[o];
		this.select.appendChild(opt);
		this.options.push(opt);
	}
};

// -------------------------------------------------------------------------------------------------
// setOptions
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setOptions = function(options) {
	this.clearOptions();
	this.options = new Array();
	this.addOptions(options);
	this.refreshView();
};

ui.comboBox.prototype.setComplexOptions = function(options) {
	this.clearOptions();
	this.buildComplexOptions(options,this.select);
};

// -------------------------------------------------------------------------------------------------
// buildComplexOptions
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.buildComplexOptions = function(options,dom) {
	for(var o in options) {
		var option = options[o];
		if(option && typeof(option) == "object") {
			// Add grouping can call setComplexOptions
			var opt_grp = document.createElement("optgroup");
			dom.appendChild(opt_grp);
			opt_grp.label = o;
			//this.options.push(opt_grp);
			this.buildComplexOptions(option,opt_grp);
		}
		else {
			// Just add entry
			var opt = document.createElement("option");
			opt.value = option;
			opt.innerHTML = option;
			dom.appendChild(opt);
			this.options.push(opt);
		}
	}
};

// -------------------------------------------------------------------------------------------------
// clearOptions
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.clearOptions = function() {
	for(var o in this.options) {
		var opt = this.options[o];
		opt.parentNode.removeChild(opt);
	}
};

// -------------------------------------------------------------------------------------------------
// refreshView
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.refreshView = function() {
	for(var i in this.options) {
		if(this.data && this.options[i].value == this.data.read())
			this.options[i].setAttribute("selected","selected");
	}
};

// -------------------------------------------------------------------------------------------------
// updateData
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.updateData = function() {
	var i = this.select.selectedIndex;
	if(this.options[i] && this.data)
		this.data.write(this.options[i].value);
	if(this.service)
		this.func.apply(this.service,this.arg);
};

// -------------------------------------------------------------------------------------------------
// setTabIndex
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setTabIndex = function(index) {
	this.select.setAttribute("tabindex",index);
};

// -------------------------------------------------------------------------------------------------
// setUpdate
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

// -------------------------------------------------------------------------------------------------
// getValue
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.getValue = function() {
	var i = this.select.selectedIndex;
	return this.options[i].value;
};

// -------------------------------------------------------------------------------------------------
// getData - returns the data connection object
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.getData = function() {
	return this.data;
};

// -------------------------------------------------------------------------------------------------
// selectOption - takes a string value and selects that option if it exists.
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.selectOption = function(option) {
	for(var o in this.options) {
		var opt = this.options[o];
		if(opt.value == option)
			opt.setAttribute("selected","selected");
		else 
			opt.setAttribute("selected","");
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.comboBox.prototype.focus = function() {
	this.select.focus();
};