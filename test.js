var settings = {
	"debug": {
		"root": root,
		"level": 1
	}
};
lib.global.initialize(settings);
ui.setCSSDomain("test");

var p = new ui.panel();
var app = new lib.app("root",p);
app.initialize();

p.addText("Hello World!");