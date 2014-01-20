ui.button = function(label,link) {
	ui.base.call(this,"button");
	var t = document.createTextNode(label);
	this.dom.appendChild(t);
	
	this.callback = undefined;
	this.parent = undefined;

	if(link) {
		this.service = link;
		this.dom.svc = this.service;
		this.dom.setAttribute("onclick","this.svc.read();");
	}
};
lib.extend(ui.base,ui.button);

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.button.prototype.setCallback = function(callback) {
	this.service = callback;
	this.dom.svc = this.service;
	this.dom.setAttribute("onclick","this.svc.read();");
};