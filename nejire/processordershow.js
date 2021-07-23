function showall( bshow ){
    var chk = document.querySelectorAll("input[type='checkbox']");

    for(let i=0; i < chk.length; i++ ){
        chk[i].checked = bshow;
        showdetail(chk[i]);
    }
}

function showdetail( obj ){
    const name = obj.id.slice(0,-5) + "item";
    const target = document.getElementById( name );
    target.style.display = obj.checked ? "" : "none";
    const labels = document.querySelectorAll("label[for='"+obj.id+"']");
    for( let i = 0; i < labels.length; i++ ){
        let icons = labels[i].querySelectorAll("i");
        for( let j = 0; j < icons.length; j++ ){
            icons[j].className = obj.checked ? "fas fa-angle-double-down fa-fw" : "fas fa-angle-double-right fa-fw";
            //icons[j].className = "fas fa-angle-double-right fa-fw";
            //icons[j].style.transform = obj.checked ? "rotate(0deg)" : "rotate(90deg)";
        }
    }
}
