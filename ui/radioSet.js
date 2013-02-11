ui.radioSet = function(name) {
	this.name = name;
	this.parent = undefined;
	this.dom = document.createElement("div");
	this.buttons = {};
	this.children = new Array();
};


// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.appendChild = function(child) {
	this.dom.appendChild(child.dom);
	this.children.push(child);
	child.setParent(this);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.addRadioButton = function(label) {
	if(!this.buttons[label]) {
		var b = new ui.radioButton(this.name,label);
		this.buttons[label] = b;
		this.appendChild(b);
	}
	
	return this.buttons[label];
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.selectButton = function(label) {
	var tar = this.buttons[label];
	for(var b in this.buttons) {
		var button = this.buttons[label];
		if(button === tar)
			button.setChecked();
		else
			button.clearChecked();
	}
};
// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.removeChildren = function() {
	this.buttons = {};
	for(var c in this.children) {
		this.children[c].removeChildren();
		delete this.children[c];
	}
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.radioSet.prototype.refreshView = function() {
};