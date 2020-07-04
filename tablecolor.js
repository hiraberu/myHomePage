// とりあえずクリックはなし
function roletableClick( event ){
  var output = '';
 
  var element = ( event.srcElement || event.target );
 
  // --- TDのみ対象とする --------------------------
  if ( element.tagName.toUpperCase() == "TD" ){
    // --- 行・列・値の取得＆編集 ------------------
    output += "行:" + element.cellIndex + "  ";
    output += "列:" + element.parentNode.sectionRowIndex + "  ";
    output += "値:" + element.innerHTML;

    console.log( output );
  }
}

function roletableMouseMove( event ){
  // 列タイトルの色付けをする(列全部の色付けすると重くなる気がした、項目が分かればよい)
  var element = ( event.srcElement || event.target );

  if ( element.tagName.toUpperCase() == "TD" ){
    if( element.cellIndex < 5 ){ return; }

    var table = element.parentNode.parentNode.parentNode;
    table.rows[ 0 ].cells[ element.cellIndex ].style.backgroundColor = "#add8e6";
  }
}

function roletableMouseOut( event ){
  var element = ( event.srcElement || event.target );
  var table = element.parentNode.parentNode.parentNode;
 
  if( table.rows === undefined ){ return; }

  var row  = table.rows[ 0 ];
  
  for (var j = 0; j < row.cells.length; j++){
    row.cells[ j ].style.backgroundColor = "";
  }
}
