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

function roletableMouseMove(event){
  // 列の色付けをする(行とセルの色付けはCSSで行っている)
  var wElement = (event.srcElement || event.target);

  if (wElement.tagName.toUpperCase() == 'TD'){
    // --- TDの位置を取得 ----------
    var wTDindex = wElement.cellIndex;
    if( wTDindex < 5 ){ return; }

    var wTABLE = wElement.parentNode.parentNode.parentNode;
    var wTR    = wTABLE.rows;
 
    for (var i = 0; i < wTR.length; i++) {
      for (var j = 0; j < wTR[i].cells.length; j++){
        var wTD = wTR[i].cells[j];
        //if(wTD.tagName.toUpperCase() == 'TD'){
          // --- 現在の選択列のみ色が付いてなかったら色付け ----
          var refstyle = document.defaultView.getComputedStyle( wTD, null );
          var wBg = '';
          if(j == wTDindex ){wBg = '#add8e6';}
          wTD.style.backgroundColor = wBg;
        //}
      }
    }
  }
}

function roletableMouseOut(event){
  var wElement = (event.srcElement || event.target);
  var wTABLE = wElement.parentNode.parentNode.parentNode;
  var wTR    = wTABLE.rows;
 
  if(wTR === undefined){return;}
 
  for (var i = 0; i < wTR.length; i++) {
    for (var j = 0; j < wTR[i].cells.length; j++){
      var wTD = wTR[i].cells[j];
      //if(wTD.tagName.toUpperCase() == 'TD'){
        wTD.style.backgroundColor = '';
      //}
    }
  }
}
