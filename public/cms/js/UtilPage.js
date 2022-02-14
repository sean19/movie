
function createOption(divShow,data,fc,title){

    for(var m = 0;m<data.length;m++) {
        var optionlist = data[m];
        var optiondiv = document.createElement('div');
        optiondiv.innerHTML = "<div>~~~~~~~~~~</div>";
        divShow.append(optiondiv);
        for(var i = 0;i<optionlist.length;i++) {
            var infodata = optionlist[i];
            var path = infodata["path"];
            var info = infodata["name"];
            var option = document.createElement('input');
            optiondiv.append(option)
            if(title == info){
                option.setAttribute('checked', true);
            }
            option.setAttribute('type', 'radio');
            option.setAttribute('name', 'select'+m);
            option.setAttribute('value', path);
            option.setAttribute('onclick', fc+'("'+path+";"+info+'")');
            var lable = document.createElement('lable');
            optiondiv.append(lable)
            lable.innerText = info
        }
    }

}
function createTable(divShow,data){

    var tb = document.createElement('table');
    divShow.append(tb)
    var tr ;
    var wdxmax =4;
    for(var i = 0;i<data.length;i++){
        var infodata= data[i];
        var idx_line = i%wdxmax;
        if(idx_line==0){
            tr = document.createElement('tr');
            tb.append(tr);
            tr.innerText=gettitleName(platform);

            tr = document.createElement('tr');
            tb.append(tr);
        }
        var td = document.createElement('td');
        td.style="witdh=200px;height=300px;";
        tr.append(td);

        var div = getMovieInfoDiv(data[i]);
        td.append(div);
    }
}



