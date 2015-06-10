;(function(win){

  /**
   * [Grid]
   * @param {[object]} options [配置参数]
   */
  function Grid(options){
    //default options
    this.options = {
      data: [],
      el: document.body,
      className: 'table'
    };
    //overwrite default options
    for(var key in options){
      this.options[ key ] = options[ key ];
    }
    //init options
    this.el   = this.options.el;
    this.data = this.options.data;
    this.initTable();
    return this;
  };
  /**
   * [renders 渲染器]
   * @type {Object}
   */
  Grid.renders = {
    button: function(val){
      var btn = document.createElement('button');
      btn.innerText = val;
      return btn;
    },
    input: function(val){
      var input = document.createElement('input');
      input.value = val;
      return input;
    }
  };
  /**
   * [initTable create table struct]
   * @return {[instance]} [this]
   */
  Grid.prototype.initTable = function () {
    this.table = document.createElement('table');
    this.table.className = this.options.className;
    this.thead = document.createElement('thead');
    this.tbody = document.createElement('tbody');
    this.tfoot = document.createElement('tfoot');
    this.table.appendChild(this.thead);
    this.table.appendChild(this.tbody);
    this.table.appendChild(this.tfoot);
    this.el.appendChild(this.table);
    return this;
  };
  /**
   * [renderHeader description]
   * @return {[type]} [description]
   */
  Grid.prototype.renderHeader = function () {
    var colums = this.options.colums;
    if(!colums && this.data.length > 0){
      colums = [];
      var model = this.data[ 0 ]; //1st.
      for(var key in model){
        colums.push({ name: key });
      }
      this.options.colums = colums;
    }
    var tr = document.createElement('tr');
    for(var index in colums){
      var field = colums[ index ];
      var th = document.createElement('th');
      th.innerText = field.label || field.name;
      tr.appendChild(th);
    }
    this.thead.appendChild(tr);
  };
  /**
   * [renderColumns description]
   * @param  {[type]} rowEl [description]
   * @param  {[type]} model [description]
   * @return {[type]}       [description]
   */
  Grid.prototype.renderColumns = function (rowEl, model) {
    var colums = this.options.colums;
    for(var index in colums){
      var config = colums[index];
      var val = model[ config.name ];
      var render = config.render;
      if(typeof render == 'string'){
        render = Grid.renders[ render ];
      }
      if(!render){
        render = Grid.renders[ typeof val ];
      }
      if(!render){
        render = function(val){
          return document.createTextNode(val);
        }
      }
      var td = document.createElement('td');
      td.data = val;
      td.appendChild(render(val || config.default || ''));
      this.options.columRender && this.options.columRender(td);
      rowEl.appendChild(td);
    }
  };
  /**
   * [renderRows description]
   * @return {[type]} [description]
   */
  Grid.prototype.renderRows = function () {
    for(var index=0;index<this.data.length;index++){
      var model = this.data[ index ];
      var tr = document.createElement('tr');
      tr.model = model;
      this.renderColumns(tr, model);
      this.options.rowRender && this.options.rowRender(tr);
      this.tbody.appendChild(tr);
    }
  };
  /**
   * [clear description]
   * @return {[type]} [description]
   */
  Grid.prototype.clear = function () {
    this.thead.innerHTML = '';
    this.tbody.innerHTML = '';
    this.tfoot.innerHTML = '';
  };
  /**
   * [renderFooter description]
   * @return {[type]} [description]
   */
  Grid.prototype.renderFooter = function () {
    // this.tfoot.appendChild();
  };
  /**
   * [render description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  Grid.prototype.render = function (data) {
    if(data){
      this.data = data;
    }
    this.clear();
    this.renderHeader();
    this.renderRows();
    this.renderFooter();
  };
  
  win.Grid = Grid;

})(window);
