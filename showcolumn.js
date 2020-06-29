window.addEventListener('load', function() {
var array = ["detail","supplement"];
    for(var j=0;j<array.length;j++){
        var id = array[j] + "_display";
        var obj = array[j] + "_check";
        var CELL = document.getElementById(id);
        var TABLE = CELL.parentNode.parentNode.parentNode;
        for(var i=0;TABLE.rows[i];i++) {
            TABLE.rows[i].cells[CELL.cellIndex].style.display = (document.getElementById(obj).checked) ? '' : 'none';
        }
    }
})

function checkbox_cell( obj,id ){
    var CELL = document.getElementById(id);
    var TABLE = CELL.parentNode.parentNode.parentNode;
    for(var i=0;TABLE.rows[i];i++) {
        TABLE.rows[i].cells[CELL.cellIndex].style.display = (obj.checked) ? '' : 'none';
    }
}

/*
// class–¼‚ÅŒ©‚é‚Æ‚«
function checkbox_cell( obj,id ) {
  var element = document.getElementsByClassName(id);
  for( var i = 0; i < element.length; i++ ){
    element[i].style.display = obj.checked ? '' : 'none';
  }
}
*/
