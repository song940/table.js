;(function(win, $, Grid){

  function DataGrid(options){
    this.options = options;
    if(this.options.api.put){
      this.options.colums.push({
        label: '编辑',
        render: 'button',
        default: 'edit'
      });
    }
    if(this.options.api.del){
      this.options.colums.push({
        label: '删除',
        render: function(val){
          var btn = document.createElement('button');
          btn.innerText = 'delete';
          btn.onclick = function(ev){
            var row = ev.target.parentNode.parentNode;
            var data = options.api.process(row.model);
          };
          return btn;
        }
      });
    }
    this.grid = new Grid(options);
    this.get();
    return this;
  };

  DataGrid.prototype.get = function () {
    var self = this;
    this.options.api.get.success = function(data){
      if(self.options.api.get.process){
        data = self.options.api.get.process(data);
      }
      self.grid.render(data);
    };
    $.ajax(this.options.api.get);
  };

  win.DataGrid = DataGrid;
})(window, Zepto, Grid);
