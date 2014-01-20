var root = document.getElementById("root");
var settings = {
	"debug": {
		"root": root,
		"level": 1
	}
};
lib.global.initialize(settings);
ui.setCSSDomain("test");
var p = new ui.panel();
p.setRoot(root);
p2 = p.addPanel();
p2.setClass("inner");
p.setClass("outer");
p2.addText("Hello World!");
p.addButton("Test Button",new db.link(null,alert,"Warning! Achtung!"));
p2.addAnchor("Clicky",null,"index.html");
var f = p.addFrame("Table");
var table = f.addTable();
table.addRow(["Cell 1","Cell 2","Cell 3"]);
table.addHeaderRow(["H1","H2","H3"]);