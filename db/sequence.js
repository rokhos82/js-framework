db.sequence = function(actions) {
	this.actions = actions ? actions : {};
}

db.sequence.prototype.read = function() {
	for(var i in this.actions) {
		var svc = this.actions[i].svc;
		var func = this.actions[i].func;
		var args = this.actions[i].args;
		func.apply(svc,args);
	}
};

db.sequence.prototype.addAction = function(key,action) {
	this.actions[key] = action;
};

db.sequence.prototype.removeAction = function(key) {
	delete this.actions[key];
};

db.sequence.action = function(svc,func,args) {
	this.svc = svc;
	this.func = func;
	this.args = args;
};