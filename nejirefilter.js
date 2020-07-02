function check_all( obj, name ){
  var check_state = obj.checked;
  const group = document.getElementsByName( name );
  for( var i = 0; i < group.length; i++ ){
    group[i].checked = check_state;
  }
  //console.log(group);
}

function change_check( obj, name ){
  var check_state = obj.checked;
  const group = document.getElementsByName( name );
  const all = document.getElementsByName( name + "all" );
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
  const check_kind = [ "camp", "fortune", "shaman", "count", "curse", "reverse_curse",
   "becursed", "bereverse_cursed", "bite", "hang" ];
  // 上のグループそれぞれの列番号
  const check_row = [ 3, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
  // RegExpでチェックする文字列
  var re = [ "", "", "", "", "", "", "", "", "", "" ];
  // フィルタをかけるか(すべてにチェックが入っていたらかけない)
  var enable_filter = [ true, true, true, true, true, true, true, true, true, true ];
  // 空白セルを抜き出すか(空白にチェックがあれば抜き出す)
  var enable_nullcell = [ false, false, false, false, false, false, false, false, false, false ];
  // どれかのグループですべてのチェックが外れていたら全部表示しないので、そのフラグ
  var hide_all = false;
  var checkstr = "";
  var table = document.getElementById( "roletable" );

  // 各グループで、RegExpでチェックする文字列を作成する
  for( var g = 0; g < check_kind.length; g++ ){
    checkstr = "";
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
      if( checkstr.length == 0 ){
        hide_all = true;
        break;
      }else{
        checkstr = checkstr.slice( 0, -1 ); // 最後の"|"を消す
        re[ g ] = new RegExp( checkstr ); // RegExpの文字列設定
      }
      console.log(checkstr);
      console.log(enable_nullcell[ g ] );
    }
  }
  // RegExpの作成終了

  // hide_all==trueの場合は、すべて非表示
  if( hide_all ){
    for( var r = 0; r < table.children[ 1 ].children.length; r++ ){
      var row = table.children[ 1 ].children[ r ]; // r番目のtr
      row.style.display = "none";
    }
  }else{
    // 各行に対して、表示/非表示を見ていく
    for( var r = 0; r < table.children[ 1 ].children.length; r++ ){
      var row = table.children[ 1 ].children[ r ]; // r番目のtr
      var visible = true;
      // 各行のチェックする項目を順にチェック
      for( var g = 0; g < check_kind.length; g++ ){
        if( enable_filter[ g ] == false ){
          // 「すべて」にチェックが入っている場合はチェック不要
        }else
        if( enable_nullcell[ g ] && "" == row.children[ check_row[ g ] ].innerHTML ){
          // 空白を表示する設定で、セルの中身が空白の場合は表示(フラグそのまま)
        }else
        if( re[ g ].test( row.children[ check_row[ g ] ].innerHTML ) ){
          // チェック文字列が入っていた場合は表示(フラグそのまま)
        }else{
          // 上記以外は非表示
          visible = false;
          break;
        }
      }
      row.style.display = visible ? "" : "none";
    }
  }
}

