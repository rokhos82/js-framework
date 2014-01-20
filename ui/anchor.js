ui.anchor = function(text,name,href) {
	ui.base.call(this,"a");
	
	if(text) { this.dom.appendChild(document.createTextNode(text)); }
	if(name) { this.dom.setAttribute("name",name); }
	if(href) { this.dom.href = href; }
}
lib.extend(ui.base,ui.anchor);

ui.anchor.prototype.addClass = function(klass) {
	this.setClass(klass);
};