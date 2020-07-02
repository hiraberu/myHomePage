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
  //const ck = [];
  const camp = document.getElementsByName( "camp" );
  var checkstr = "";
  var table = document.getElementById( "roletable" );
  
  // すべてにチェックが入っている時は全部表示するので、チェック文字列作成しない
  if( document.getElementsByName( "campall" )[0].checked ){
    for( var i = 0; i < table.children[1].children.length; i++ ){
      var row = table.children[1].children[i]; // i番目のtr
      row.style.display = ""; // table-rowでも上手くいく、blockだとブラウザによって詰まったりする
    }
  }else{
    for( let i = 0; i < camp.length; i++ ){
      if( camp[i].checked ){
        //ck.push( camp[i].value );
        checkstr += camp[i].value + "|";
      }
    }
    if( checkstr.length != 0 ){
      checkstr = checkstr.slice( 0, -1 ); // 最後の"|"を消す
      var re = new RegExp( checkstr );
      for( var i = 0; i < table.children[1].children.length; i++ ){
        var row = table.children[1].children[i]; // i番目のtr
        row.style.display = re.test(row.children[3].innerHTML) === true ? "" : "none";
        console.log(row.children[3].innerHTML);
        //row.style.display = 'none';
      }
    }else{
      for( var i = 0; i < table.children[1].children.length; i++ ){
        var row = table.children[1].children[i]; // i番目のtr
        row.style.display = "none";
      }
    }
    console.log(checkstr);
  }
}

