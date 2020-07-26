/* フレーム内に読み込むドキュメントサイズによって高さを変更(下のを使うことにしたので未使用) */
function adjust_frame_css(F){
  if(document.getElementById(F)) {
    var myF = document.getElementById(F);
    var myC = myF.contentWindow.document.documentElement;
    var myH = 500;
    if(document.all) {
      myH  = myC.scrollHeight;
    } else {
      myH = myC.offsetHeight;
    }
    myF.style.height = myH+"px";
  }
}

/* ウィンドウのサイズに合わせて、説明表示領域の高さを変更 */
window.addEventListener( 'load', function(){
  change_windowsize();
})

window.onresize = change_windowsize;

function change_windowsize(){
  var myFrame = document.getElementById( "ORG_DESC" );
  myFrame.style.height = (document.documentElement.clientHeight-document.getElementById( "SEARCH" ).clientHeight-12)+"px";

  // 左側に表示するやつも位置調整
  myFrame = document.getElementById( "ORG_DESC_SUB" );
  myFrame.style.top = ( document.getElementById( "SEARCH" ).clientHeight + 4 ) + "px";
  myFrame.style.left = (document.getElementsByClassName('split-left')[0].clientWidth - 220) + "px";
}
