db.builder = function() {
	this.sources = {};
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
db.builder.prototype.read = function() {
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
db.builder.prototype.write = function(key) {
};

db.builder.prototype.addSource = function(key,source) {
	this.sources[key] = source;
};

db.builder.prototype.removeSource = function(key) {
	this.sources[key] = {};
	delete this.sources[key];
};