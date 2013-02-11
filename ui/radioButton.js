ui.radioButton = function(group,value) {
	this.group = group;
	this.parent = undefined;
	
	this.dom = document.createElement("div");
	
	var r = document.createElement("input");
	r.setAttribute("type","radio");
	this.dom.appendChild(r);
	this.radio = r;
	this.radio.id = group + value;
	this.radio.name = group;
	this.radio.value = value;
	this.radio.svc = this;
	
	var l = document.createElement("label");
	l.innerHTML = value;
	l.setAttribute("for",group + value);
	this.dom.appendChild(l);
	this.label = l;
	
	this.radio.setAttribute("onclick","this.svc.updateData();");
};

ui.radioButton.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.radioButton.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

ui.radioButton.prototype.updateData = function() {
	if(this.service) {
		this.func.apply(this.service,this.arg);
	}
};

ui.radioButton.prototype.refreshView = function() {
};

ui.radioButton.prototype.setChecked = function() {
	this.radio.checked = true;
};

ui.radioButton.prototype.clearChecked = function() {
	this.radio.checked = false;
};

ui.radioButton.prototype.removeChildren = function() {
	this.dom.removeChild(this.radio);
	this.dom.removeChild(this.label);
};