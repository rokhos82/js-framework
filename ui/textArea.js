ui.textArea = function(data) {
	this.dom = document.createElement("textarea");
	this.parent = undefined;
	this.setData(data);

	this.dom.svc = this;
	this.dom.setAttribute("onblur","this.svc.updateData();");

	this.classes = new Array();
};

ui.textArea.prototype.setParent = function(parent) {
	this.parent = parent;
};

ui.textArea.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};

ui.textArea.prototype.refreshView = function() {
	if(this.data)
		this.dom.value = this.data.read();
};

ui.textArea.prototype.setUpdate = function(svc,func,arg) {
	this.service = svc;
	this.func = func;
	this.arg = arg;
};

ui.textArea.prototype.updateData = function() {
	this.data.write(this.dom.value);
	if(this.service)
			this.func.apply(this.service,this.arg);
};

ui.textArea.prototype.addClass = function(klass) {
	this.classes.push(klass);
	var klass_str = "";
	for(var c in this.classes) {
		klass_str += this.classes[c] + " ";
	}
	this.dom.setAttribute("class",klass_str);
};

ui.textArea.prototype.removeChildren = function() {
};

ui.textArea.prototype.focus = function() {
	this.dom.focus();
};

ui.textArea.prototype.setSize = function(row,col) {
	this.dom.setAttribute("rows",row);
	this.dom.setAttribute("cols",col);
};