const existsub
 = [ 2,3,11,12,13,16,21,22,24,32,35,37,38,40,41,44,45,47,48,49,50,58,60,61,62,63,64,65,66,68,69,70,
  72,73,74,75,82,83,87,88,89,90,91,92,94,95,96,97,98,110,112,113,115,119,126,127,131,132,133,134,135,
  139,142,143,144,147,156,158,161,168,169,171,177,180,182,184,185,186,189,190,191,194,195,204,205,220,
  221,222,225,227,231,249,252,260,262,271,276,287,288,289,290,298,299,314,315,333,348,357,361,364,369,
  370,371,388,389,400,401,403,404,405,411,412,413,420,421,436,437,451,453,456,464,470,484,485 ];

/* 直接入力による表示 */
function execDirectInput(){
  // RegExpでチェックする文字列
  var checkstr = document.getElementById( "searchstr" ).value;
  if( "" == checkstr ){ return; }
  var role_url = "";
  var num = Number( checkstr );
  
  if( !isNaN( num ) ){
    if( 0 <= num && num < 500 ){
      role_url = "desc/nejire_role" + ( "000" + num ).slice( -3 ) + ".html";
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
    document.getElementById( "ORG_DESC" ).src = role_url;
    document.getElementById( "showid" ).innerHTML = ( -1 == num ) ? "" : "<strong>[" + String( num ) + "]</strong>";
    change_sub( num );
  }
}

/* 直接入力ででenterが押された場合、実行する */
function checkDirectInputEnter(){
  if( 13 == window.event.keyCode ){
    execDirectInput();
  }
}

var element = document.getElementById( "ORG_DESC" )

element.addEventListener( "load", function(event){
  let url = document.getElementById("ORG_DESC").contentWindow.location.href;
  change_url(url);
})

function change_url( role_url ){
  if( "" != role_url ){
    /* 番号を抜き出す */
    var num = Number( role_url.slice( -8, -5 ) );
    if( !isNaN( num ) ){
      document.getElementById( "showid" ).innerHTML = "<strong>[" + String( num ) + "]</strong>";
      change_sub( num );
    }else{
      document.getElementById( "showid" ).innerHTML = "";
      change_sub( -1 );
    }
  }
}

function change_sub(num) {
  // 表示しない場合は何もしない
  if( document.getElementById("SUB_SHOW").value == "<<" ){ return; }
  /* サブ表示があれば表示する */
  var myFrame = document.getElementById("ORG_DESC_SUB");
  if (-1 != existsub.indexOf(num)) {
    var role_url = "desc/nejire_role" + ("000" + num).slice(-3) + "_sub.html";
    myFrame.src = role_url;
    myFrame.style.display = "";

    var height = 400;
    var element = myFrame.contentWindow.document.documentElement;
    if( document.all ){
      height = element.scrollHeight;
    }else{
      height = element.offsetHeight;
    }
    myFrame.style.height = height + "px";
  }else{
    myFrame.style.display = "none";
  }
}

function subshowhide( val ){
  if( val.value == ">>" ){
    val.value = "<<";
    document.getElementById( "ORG_DESC_SUB" ).style.display = "none";
  }else{
    val.value = ">>";
    if( "" == document.getElementById( "showid" ).innerHTML ){
      change_sub( -1 );
      return;
    }
    var numstr = document.getElementById( "showid" ).innerHTML.slice(9,-10);
    var num = Number( numstr );
    if( !isNaN( num ) ){
      change_sub( num );
    }else{
      change_sub( -1 );
    }
  }
}