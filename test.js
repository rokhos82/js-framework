ui.setCSSDomain("test");
var root = document.getElementById("root");
var p = new ui.panel();
p.setRoot(root);
p2 = p.addPanel();
p2.setClass("inner");
p.setClass("outer");
p2.addText("Hello World!");
p.addButton("Test Button",new db.link(null,alert,"Warning! Achtung!"));