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

var root = document.getElementById("root");
var p = new ui.panel();
p.setRoot(root);
p2 = p.addPanel();
p2.setClass("inner");
p.setClass("outer");
p2.addText("Hello World!");