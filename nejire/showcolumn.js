function checkbox_cell( obj,id ){
    var cell = document.getElementById(id);
    var table = cell.parentNode.parentNode.parentNode;
    for(var i = 0; i < table.rows.length; i++ ){
        table.rows[ i ].cells[ cell.cellIndex ].style.display = ( obj.checked ) ? "" : "none";
    }
}
