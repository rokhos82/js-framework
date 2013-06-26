lib.global = {
	this.debug = null;
};

//
// lib.global.initialize - this functions initializes the global objects for the JS library.
// The function takes a single object was a parameter that defines which global objects are
// to be initialized.
// Here is a listing of those objects:
//  - debug: {root,level}
//    root - DOM root to attach the debug output window to
//    level - the debugging level to use
//
lib.global.initialize = function(settings) {
	if(settings.debug) {}
		this.debug = new lib.debug(settings.debug.root,settings.debug.level);
	}
};