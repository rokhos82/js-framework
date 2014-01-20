// -------------------------------------------------------------------------------------------------
// ui.frame - this object is a simple fieldset wrapper.
// -------------------------------------------------------------------------------------------------
ui.frame = function(title,frame) {
	ui.baseExt.call(this,"fieldset",frame);
	this.title = document.createElement("legend");
	this.title.innerHTML = title;
	this.dom.appendChild(this.title);
};
lib.extend(ui.baseExt,ui.frame);
lib.borrow(ui.interfaces.addTable,ui.frame);