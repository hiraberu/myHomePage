/* 直接入力による表示 */
function execDirectInput(){
  // RegExpでチェックする文字列
  var checkstr = document.getElementById( "searchstr" ).value;
  if( "" == checkstr ){ return; }
  var role_url = "";
  var num = Number( checkstr );
  
  if( !isNaN( num ) ){
    if( 0 <= num && num < 500 ){
      role_url = "nejire_role" + ( "000" + num ).slice( -3 ) + ".html";
    }else{
      num = -1;
    }
  }else{
    num = -1;
  }
  if( "" == role_url ){
    const re = new RegExp( checkstr ); // RegExpの文字列設定
    /* 役職リンクを調べる */
    var element = document.getElementsByClassName( "rolelink" );
    /* 完全一致するものを検索 */
    for( var i = 0; i < element.length; i++ ){
      if( checkstr == element[ i ].innerHTML ){
        role_url = element[ i ].href;
        break;
      }
    }
    if( "" == role_url ){
      for( var i = 0; i < element.length; i++ ){
        if( re.test( element[ i ].innerHTML ) ){
          role_url = element[ i ].href;
          break;
        }
      }
    }
    if( "" != role_url ){
      /* 番号を抜き出す */
      num = Number( role_url.slice( -8, -5 ) );
    }else{
      element = document.getElementsByClassName( "sublink" );
      for( var i = 0; i < element.length; i++ ){
        if( checkstr == element[ i ].innerHTML ){
          role_url = element[ i ].href;
          break;
        }
      }
      if( "" == role_url ){
        for( var i = 0; i < element.length; i++ ){
          if( re.test( element[ i ].innerHTML ) ){
            role_url = element[ i ].href;
            break;
          }
        }
      }
    }
  }
  if( "" != role_url ){
    document.getElementById( "descframe" ).src = role_url;
    document.getElementById( "showid" ).innerHTML = ( -1 == num ) ? "" : "[" + String( num ) + "]";
  }
}

/* 直接入力ででenterが押された場合、実行する */
function checkDirectInputEnter(){
  if( 13 == window.event.keyCode ){
    execDirectInput();
  }
}
