ui.tabView = function() {
	this.dom = document.createElement("div");
	this.tabs = {};
	this.panels = {};
	this.children = new Array();
	this.parent = undefined;
	this.activePanel = undefined;
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.tabView.prototype.setParent = function(parent) {
	this.parent = parent;
};

// -------------------------------------------------------------------------------------------------
// appendChild
// -------------------------------------------------------------------------------------------------
ui.tabView.prototype.appendChild = function(child) {
	this.children.push(child);
	this.dom.appendChild(child.dom);
	child.setParent(this);
};

// -------------------------------------------------------------------------------------------------
// addTab
// -------------------------------------------------------------------------------------------------
ui.tabView.prototype.addTab = function(title) {
	var p = new ui.panel(title);
	this.tabs[title] = title;
	this.panels[title] = p;
	this.appendChild(p);
};

// -------------------------------------------------------------------------------------------------
// selectTab
// -------------------------------------------------------------------------------------------------
ui.tabView.prototype.selectTab = function(name) {
	// Change the active panel
	if(this.activePanel != undefined)
		this.activePanel.hide();
	this.activePanel = this.panels[name];
	this.activePanel.show();
	
	// Select the approriate tab.
	for(var t in this.tabs) {
		if(t == name) {
			// Set this tab as active.
		}
		else {
			// Set this tab as inactive.
		}
	}
};