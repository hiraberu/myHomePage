function check_all( obj ){
  var check_state = obj.checked;
  const name = obj.name.slice( 0, -3 );
  const group = document.getElementsByName( name );
  for( var i = 0; i < group.length; i++ ){
    group[i].checked = check_state;
  }
  //console.log(group);
}

function change_check( obj ){
  var check_state = obj.checked;
  const group = document.getElementsByName( obj.name );
  const all = document.getElementsByName( obj.name + "all" );
  var cntCheck = 0;
  
  for( var i = 0; i < group.length; i++ ){
    if( group[i].checked ){
      cntCheck++;
    }
    all[0].checked = ( cntCheck === group.length );
  }
  //console.log( cntCheck );
}

function execFilter(){
  // チェックするグループの種類
  const check_kind = [
    "camp", "fortune", "shaman", "count", "curse",
    "reverse_curse", "becursed", "bereverse_cursed", "bite", "hang",
    "blocked", "block", "alive", "revive", "vote",
    "change", "show", "sub", "window", "dayafter", "nums" ];
  // 上のグループそれぞれの列番号
  const check_row = [
    3, 5, 6, 7, 8,
    9, 10, 11, 12, 13,
    14, 15, 16, 17, 18,
    19, 20, 21, 22, 24, 26 ];
  // RegExpでチェックする文字列
  var re = Array( check_kind.length ); re.fill("");
  // フィルタをかけるか(すべてにチェックが入っていたらかけない)
  var enable_filter = Array( check_kind.length ); enable_filter.fill( true );
  // 空白セルを抜き出すか(空白にチェックがあれば抜き出す)
  var enable_nullcell = Array( check_kind.length ); enable_nullcell.fill( false );
  // どれかのグループですべてのチェックが外れていたら全部表示しないので、そのフラグ
  var hide_all = false;
  var checkstr = "";
  var table = document.getElementById( "roletable" );

  //console.log(check_row.length);
  // 各グループで、RegExpでチェックする文字列を作成する
  for( var g = 0; g < check_kind.length; g++ ){
    checkstr = "";
    //console.log( check_kind[ g ] );
    enable_nullcell[ g ] = false;
    // 「すべて」にチェックが入っている時は全部表示するので、チェック文字列作成しない
    if( document.getElementsByName( check_kind[ g ] + "all" )[0].checked ){
      enable_filter[ g ] = false;
    }else{
      // そのグループのフィルタに用いる文字要素を取得
      var element = document.getElementsByName( check_kind[ g ] );
      for( var i = 0; i < element.length; i++ ){
        if( element[ i ].checked ){
          // 空白だけはRegExpで抜き出せないので別処理にする
          if( "" == element[ i ].value ){
            enable_nullcell[ g ] = true;
          }else{
            checkstr += element[ i ].value + "|";
          }
        }
      }
      // チェックが1つも入っていなかった場合、すべて非表示にするフラグを立てて、確認終了
      if( 0 == checkstr.length ){
        if( false == enable_nullcell[ g ] ){
          hide_all = true;
          break;
        }else{
          re[ g ] = "";
        }
      }else{
        checkstr = checkstr.slice( 0, -1 ); // 最後の"|"を消す
        re[ g ] = new RegExp( checkstr ); // RegExpの文字列設定
      }
      //console.log(checkstr);
      //console.log(enable_nullcell[ g ] );
    }
  }
  // RegExpの作成終了

  // hide_all==trueの場合は、すべて非表示
  if( hide_all ){
    for( var r = 0; r < table.children[ 1 ].children.length; r++ ){
      var row = table.children[ 1 ].children[ r ]; // r番目のtr
      row.style.display = "none";
    }
    document.getElementById( "showcount" ).innerHTML = "0役職";
  }else{
    // 各行に対して、表示/非表示を見ていく
    var cnt = 0;
    for( var r = 0; r < table.children[ 1 ].children.length; r++ ){
      var row = table.children[ 1 ].children[ r ]; // r番目のtr
      var visible = true;
      // 各行のチェックする項目を順にチェック
      for( var g = 0; g < check_kind.length; g++ ){
        if( 18 != g ){
          if( enable_filter[ g ] == false ){
            // 「すべて」にチェックが入っている場合はチェック不要
          }else
          if( enable_nullcell[ g ] && "" == row.children[ check_row[ g ] ].innerHTML ){
            // 空白を表示する設定で、セルの中身が空白の場合は表示(フラグそのまま)
          }else
          if( "" != re[ g ] && re[ g ].test( row.children[ check_row[ g ] ].innerHTML ) ){
            // チェック文字列が入っていた場合は表示(フラグそのまま)
          }else{
            // 上記以外は非表示
            visible = false;
            break;
          }
        }else{
          if( enable_filter[ g ] == false ){
            // 「すべて」にチェックが入っている場合はチェック不要
          }else
          if( enable_nullcell[ g ] && ( "" == row.children[ check_row[ g ] ].innerHTML && "" == row.children[ check_row[ g ] + 1 ].innerHTML ) ){
            // 空白を表示する設定で、セルの中身が空白の場合は表示(フラグそのまま)
          }else
          if( "" != re[ g ] && ( re[ g ].test( row.children[ check_row[ g ] ].innerHTML ) || re[ g ].test( row.children[ check_row[ g ] + 1 ].innerHTML ) ) ){
            // チェック文字列が入っていた場合は表示(フラグそのまま)
          }else{
            // 上記以外は非表示
            visible = false;
            break;
          }
        }
      }
      row.style.display = visible ? "" : "none";
      if( visible ){ cnt++; }
    }
    document.getElementById( "showcount" ).innerHTML = cnt + "役職";
  }
}

