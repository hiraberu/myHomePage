// ページ読み込むまではイベント発生させない
window.addEventListener('load', function() {
  document.getElementById( "roletable" ).addEventListener( "click", { name: event, handleEvent: roletableClick } );
  if( !isSmartPhone() ){
    document.getElementById( "roletable" ).addEventListener( "mousemove", { name: event, handleEvent: roletableMouseMove } );
    document.getElementById( "roletable" ).addEventListener( "mouseout", { name: event, handleEvent: roletableMouseOut } );
  }
})

function isSmartPhone() {
  if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
    return true;
  } else {
    return false;
  }
}

// 役職クリックで役職詳細表示
function roletableClick( event ){
  var element = ( event.srcElement || event.target );
  var popup = document.getElementById("rolepopup");
 
  if ( element.tagName.toUpperCase() == "TD" ){
    // 役職クリック時のみポップアップ
    if( 1 == element.cellIndex ){
      var role_url = "nejire_role" + ( "000" + element.parentNode.sectionRowIndex ).slice( -3 ) + ".html";

      // srcは絶対パスになっているので、文字列数固定なので最後の19文字を比較
      if( document.getElementById( "nejire_org_description" ).src.slice( -19 ) == role_url ){
        popup.classList.toggle("show");
      }else{
        document.getElementById( "nejire_org_description" ).src = role_url;
        popup.classList.add("show");
      }
    }else{
      popup.classList.remove("show");
      if( isSmartPhone() ){ // スマホの場合はクリックで、タイトルに色付け
        var table = element.parentNode.parentNode.parentNode;
        var row  = table.rows[ 0 ];
        for (var j = 5; j < row.cells.length; j++){
          row.cells[ j ].style.backgroundColor = ( j == element.cellIndex ) ? "#add8e6" : "";
        }
      }
    }
  }else{
    // タイトル行クリックでもポップアップは隠す
    popup.classList.remove("show");
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
