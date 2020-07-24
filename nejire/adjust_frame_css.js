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

window.onresize = change_height_css;

function change_height_css(){
  var myFrame = document.getElementById( "descframe" );
  myFrame.style.height = (document.documentElement.clientHeight-12)+"px";
}