function getHtmlData(url, postdata, fc) {
    $.ajax({
        url: url,
        data: postdata,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            switch (data.error) {
                case 0:
                    fc(data);
                    break;
                case 1002:
                    alert("search ERR please try again!");
                    break;
                default:
                    alert("err:" + JSON.stringify(data.data));
                    break;
            }

        },
        error: function () {
            alert("search ERR please try again!");
        }

    });
}
function updateTable(div, arrdata) {
    div.innerHTML = "";
    if (arrdata.length == 0) {
        div.innerHTML = "<span>没有数据!</span>";
        return
    }
    var tb = document.createElement('table');
    div.appendChild(tb);
    tb.style.backgroundColor

    var tr;

    var titledata = { 'name': '字段名', "path": '路径', "att": '属性', "deel": '处理', "child": 'child', "data": '结果' }

    var line = arrdata.length;
    for (var i = -1; i < line; i++) {
        var infoobj = (i == -1 ? titledata : arrdata[i]);
        tr = document.createElement('tr');
        tb.appendChild(tr);
        var ww = (document.body.clientWidth * 0.8) / 6;
        var hh = 50;
        for (var j = 0; j < 6; j++) {
            var info = "";

            var td = document.createElement('td');
            td.style.cssText = "border:2px solid black;backgroundColor: #00ffffwidth:" + ww + "px; height:" + hh + "px;"
            td.style.borderColor = "#ffffff";

            td.style.width = ww + 'px';
            td.style.height = hh + 'px';
            switch (j) {
                case 0: td.style.backgroundColor = "#00ff00"; info = infoobj['name']; break;
                case 1: td.style.backgroundColor = "#00ff00"; info = infoobj['path']; break;
                case 2: td.style.backgroundColor = "#00ff00"; info = infoobj['att']; break;
                case 3: td.style.backgroundColor = "#0000ff"; info = infoobj['deel']; break;
                case 4: td.style.backgroundColor = "#0000ff"; info = infoobj['child']; break;
                case 5: td.style.backgroundColor = "#0000ff"; info = infoobj['data']; break;
            }
            tr.appendChild(td);
            var div = getInfoDiv(info, ww, hh);
            td.appendChild(div);
        }

    }
}
function updateTable2(div, arrdata) {
    div.innerHTML = "";
    if (arrdata.length == 0) {
        div.innerHTML = "<span>没有数据!</span>";
        return
    }
    var tb = document.createElement('table');
    div.appendChild(tb);
    tb.style.backgroundColor

    var tr;
    var line = arrdata.length;
    for (var i = 0; i < line; i++) {
        var infoobj = arrdata[i];
        tr = document.createElement('tr');
        tb.appendChild(tr);
        var ww = (document.body.clientWidth * 0.8) / 6;
        var hh = 50;
        var td = document.createElement('td');
        td.style.cssText = "border:2px solid black;backgroundColor: #00ffffwidth:" + ww + "px; height:" + hh + "px;"
        td.style.borderColor = "#ffffff";
        td.style.width = ww + 'px';
        td.style.height = hh + 'px';
        td.style.backgroundColor = "#00ff00"; 
        tr.appendChild(td);
        var div = getInfoDiv(infoobj, ww, hh);
        td.appendChild(div);

    }
}
function getInfoDiv(infodata, ww, hh) {
    var frameDiv = document.createElement('div');
    var framespan = document.createElement('span');
    frameDiv.appendChild(framespan);
    frameDiv.style.textAlign = "center";
    framespan.innerText = infodata;

    return frameDiv;
}