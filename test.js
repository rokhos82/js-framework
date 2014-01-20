var test = {};
test.customUI = function() {
	ui.base.call(this);
	this.dom = document.createElement("div");
};
lib.extend(ui.base,test.customUI);


test.customUI.prototype.setRoot = function(root) {
	this.rootElement = root;
	root.appendChild(this.dom);
};