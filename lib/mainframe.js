lib.mainframe = function(parent) {
	this.messages = {};
	this.listeners = {};
	this.parent = parent;
	this.children = [];
};

// -------------------------------------------------------------------------------------------------
// addChildFrame
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.addChildFrame = function() {
	var m = new lib.mainframe(this);
	this.children.push(m);
	return m;
};

// -------------------------------------------------------------------------------------------------
// addHandler
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.addHandler = function(type,name,func,obj,arg) {
	if(!this.messages[type])
		this.messages[type] = {};
		
	this.messages[type][name] = {};
	this.messages[type][name].func = func;
	this.messages[type][name].obj = obj;
	this.messages[type][name].arg = arg;
};

// -------------------------------------------------------------------------------------------------
// removeHandler
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.removeHandler = function(type,name) {
	if(this.messages[type])
		delete this.messages[type][name];
};

// -------------------------------------------------------------------------------------------------
// trigger
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.trigger = function(type,down) {
	if(this.messages[type]) {
		for(var n in this.messages[type]) {
			this.messages[type][n].func.apply(this.messages[type][n].obj,this.messages[type][n].arg);
		}
	}

	if(down) {
		for(var c in this.children) {
			this.children[c].trigger(type,down);
		}
	}
	else {
		if(this.parent)
			this.parent.trigger(type,down);
	}
};

// -------------------------------------------------------------------------------------------------
// reset
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.reset = function() {
	this.messages = {};
	this.listeners = {};
	this.children = [];
};

// -------------------------------------------------------------------------------------------------
// removeChildren
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.removeChildren = function() {
	this.children = [];
};

// -------------------------------------------------------------------------------------------------
// setParentFrame
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.setParentFrame = function(p) {
	this.parent = p;
};

// -------------------------------------------------------------------------------------------------
// setListener
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.setListener = function(key,svc,func) {
	this.listeners[key] = {};
	this.listeners[key].svc = svc;
	this.listeners[key].func = func;
};

// -------------------------------------------------------------------------------------------------
// sendEvent
// -------------------------------------------------------------------------------------------------
lib.mainframe.prototype.sendEvent = function(key,args) {
	var handled = false;

	// If we have a listener for the event, call it.
	if(this.listeners[key]) {
		handled = this.listeners[key].func.apply(this.listeners[key].svc,args);
	}

	// If the event has not been handled and we have a parent.  Call the parent listener.
	if(!handled && this.parent)
		this.parent.sendEvent(key,args);
};