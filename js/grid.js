;(function(win){

  function Grid(options){
    this.options = {
      prefix: 'tbl-',
      className: 'table'
    };
    for(var key in options){
      this.options[ key ] = options[ key ];
    }

    this.data = this.options.data;
    return this;
  };

  Grid.renders = {
    text: function(val){
      return document.createTextNode(val);
    }
  };


  Grid.prototype.clear = function () {
    this.options.el.innerHTML = '';
  };

  Grid.prototype.renderTable = function () {
    this.table = document.createElement('table');
    this.table.className = this.options.className;
    this.options.el.appendChild(this.table);
    return this;
  };

  Grid.prototype.renderHeader = function () {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var colums = this.options.colums;
    for(var key in colums){
      var field = this.options.colums[ key ];
      var th = document.createElement('th');
      th.id = this.options.prefix + field.name;
      th.innerText = field.label;
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    this.table.appendChild(thead);
  };

  Grid.prototype.renderColumns = function (rowEl, model) {
    for(var key in model){
      var val = model[ key ];
      var td = document.createElement('td');
      var config = this.options.colums[ key ];
      var render = config.render;
      if(typeof render == 'string'){
        render = Grid.renders[ config.render || 'text' ];
      }
      td.appendChild( render(val) );
      rowEl.appendChild(td);
    }
  };

  Grid.createColumns = function(){
    if(!this.options.colums){
      this.options.colums = [];
    }
  };

  Grid.prototype.renderRows = function () {

    var tbody = document.createElement('tbody');
    for(var i=0;i<this.data.length;i++){
      var item = this.data[i];
      var tr = document.createElement('tr');
      this.renderColumns(tr, item);
      tbody.appendChild(tr);
    }
    this.table.appendChild(tbody);
  };

  Grid.prototype.renderFooter = function () {

  };

  Grid.prototype.render = function () {
    this.clear();
    this.renderTable();
    this.renderHeader();
    this.renderRows();
    this.renderFooter();
  };

  win.Grid = Grid;



})(window);
