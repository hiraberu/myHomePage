// とりあえずクリックはなし
/*
function roletableClick(event){
  var wOut = '';
 
  var wElement = (event.srcElement || event.target);
 
  // --- TDのみ対象とする --------------------------
  if (wElement.tagName.toUpperCase() == 'TD'){
    // --- 行・列・値の取得＆編集 ------------------
    wOut += '行:' + wElement.cellIndex + '&nbsp;&nbsp;';
    wOut += '列:' + wElement.parentNode.sectionRowIndex + '&nbsp;&nbsp;';
    wOut += '値:' + wElement.innerHTML;

    console.log( wOut );
  }
}
*/

function roletableMouseMove(event){
  // 列タイトルの色付けをする(列全部の色付けすると重くなる気がした、項目が分かればよい)
  var wElement = (event.srcElement || event.target);

  if (wElement.tagName.toUpperCase() == 'TD'){
    // --- TDの位置を取得 ----------
    var wTDindex = wElement.cellIndex;
    if( wTDindex < 5 ){ return; }

    var wTABLE = wElement.parentNode.parentNode.parentNode;
    wTABLE.rows[ 0 ].cells[ wTDindex ].style.backgroundColor = '#add8e6';
  }
}

function roletableMouseOut(event){
  var wElement = (event.srcElement || event.target);
  var wTABLE = wElement.parentNode.parentNode.parentNode;
  var wTR    = wTABLE.rows;
 
  if(wTR === undefined){return;}
  
  for (var j = 0; j < wTR[ 0 ].cells.length; j++){
    var wTD = wTR[ 0 ].cells[ j ];
    wTD.style.backgroundColor = '';
  }
}
