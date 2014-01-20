////////////////////////////////////////////////////////////////////////////////////////////////////
// Table
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.table = function() {
	ui.baseExt.call(this,"table");
	this.header = document.createElement("thead");
	this.body = document.createElement("tbody");
	this.footer = document.createElement("tfoot");
	this.dom.appendChild(this.header);
	this.dom.appendChild(this.body);
	this.dom.appendChild(this.footer);
	
	this.rows = new Array();
};
lib.extend(ui.baseExt,ui.table);

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.prototype.setUpdater = function(up) {
	this.updater = up;
};

// -------------------------------------------------------------------------------------------------
// addClass
// -------------------------------------------------------------------------------------------------
ui.table.prototype.addClass = function(klass) {
	this.setClass(klass);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.table.prototype.setHeaderClass = function(klass) {
	this.header.setAttribute("class",klass);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.table.prototype.setFooterClass = function(klass) {
	this.footer.setAttribute("class",klass);
};

// -------------------------------------------------------------------------------------------------
// 
// -------------------------------------------------------------------------------------------------
ui.table.prototype.setBodyClass = function(klass) {
	this.body.setAttribute("class",klass);
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.addRow = function(cells) {
	var r = new ui.table.row();
	this.body.appendChild(r.dom);
	r.setParent(this);
	if(typeof(cells) == "object")
		r.addCellArray(cells);
	this.rows.push(r);
	return r;
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.addCustomRow = function(elements) {
	var r = new ui.table.row();
	for(var e in elements) {
		r.addCustomCell(elements[e]);
	}
	this.body.appendChild(r.dom);
	this.rows.push(r);
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.mapUpdater = function(row,cell,type,name,func) {
	this.updater.addMessageHandler(name,type,this.rows[row].cells[cell],func);
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.removeRow = function(row) {
	for(var r in this.rows) {
		if(this.rows[r] === row) {
			this.body.removeChild(row.dom);
			this.rows.splice(r,1);
		}
	}
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.refreshView = function() {
	for(var r in this.rows) {
		this.rows[r].refreshView();
	}
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.removeRows = function() {
	for(var r in this.rows) {
		var row = this.rows[r];
		row.removeChildren();
		this.body.removeChild(row.dom);
		delete this.rows[r];
	}
};

// -------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------
ui.table.prototype.addHeaderRow = function(cells) {
	var r = new ui.table.row();
	this.header.appendChild(r.dom);
	r.setParent(this);
	if(typeof(cells) == "object")
		r.addCellArray(cells);
	return r;
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Row
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.table.row = function() {
	ui.baseExt.call(this,"tr");
	this.cells = new Array();
};
lib.extend(ui.baseExt,ui.table.row);

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.appendChild = function(child) {
	ui.baseExt.prototype.appendChild.call(this,child);
	this.cells.push(child);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.addCell = function(cell) {
	var c = document.createElement("td");
	if(typeof(cell) == "string") {
		c.innerHTML = cell;
	}
	else {
		var tf = new ui.textField();
		tf.setData(cell);
		c.appendChild(tf.dom);
	}
	this.dom.appendChild(c);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.addCellArray = function(cells) {
	for(var i in cells) {
		var c = new ui.table.cell();
		if(typeof(cells[i]) == "string" || typeof(cells[i]) == "number") {
			var t = new ui.text(cells[i]);
			c.appendChild(t);
		}
		else if(cells[i].write) {
			var t = new ui.textField();
			t.setData(cells[i]);
			c.appendChild(t);
		}
		else if(cells[i].setParent) {
			c.appendChild(cells[i]);
		}
		else {
			var t = new ui.text();
			t.setData(cells[i]);
			c.appendChild(t);
		}
		this.appendChild(c);
	};
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.addCustomCell = function(custom) {
	var c = new ui.table.cell();
	c.appendChild(custom);
	this.appendChild(c);
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.refreshView = function() {
	for(var c in this.cells) {
		this.cells[c].refreshView();
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.removeChildren = function() {
};

// -------------------------------------------------------------------------------------------------
// addTooltip - add a tooltip to the row.
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.addTooltip = function(tip,klass) {
	var tooltip = new ui.text(tip);
	tooltip.addClass(klass);
	this.cells[0].appendChild(tooltip);
};

// -------------------------------------------------------------------------------------------------
// setClass - sets the CSS class for the row.
// -------------------------------------------------------------------------------------------------
ui.table.row.prototype.setClass = function(klass) {
	this.dom.setAttribute("class",klass);
};

////////////////////////////////////////////////////////////////////////////////////////////////////
// Cells
////////////////////////////////////////////////////////////////////////////////////////////////////
ui.table.cell = function() {
	ui.baseExt.call(this,"td");
};
lib.extend(ui.baseExt,ui.table.cell);

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.cell.prototype.refreshView = function() {
	for(var c in this.children) {
		this.children[c].refreshView();
	}
};

// -------------------------------------------------------------------------------------------------
//
// -------------------------------------------------------------------------------------------------
ui.table.cell.prototype.setData = function(connector) {
	this.data = connector;
	if(connector)
		this.refreshView();
};