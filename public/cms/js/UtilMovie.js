

function initTitle(item, pm, sub = '') {
    item.innerText = gettitleName(pm) + (sub == "" ? "" : ":" + sub);
}
function gettitleName(platform) {
    var titlename = '摩羯视频';
    var pm = platform + "";
    switch (pm) {
        case '1':
            titlename = '11视频';
            break;
        case '2':
            titlename = '美剧';
            break;
        case '3':
            titlename = '碟调';
            break;
        case '4':
            titlename = '乐看';
            break;
        case '5':
            titlename = '日韩剧';
            break;
        case '6':
            titlename = 'wxtv';
            break;
        case '100':
            titlename = "hao5直播";
            break;
    }
    return titlename;
}
function getTitle(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
        //解决办法:将解码方式unscape换为decodeURI
    } else {
        return null;
    }
}
function searchData(url, postdata, msg, ty) {
    $.ajax({
        url: url,
        data: postdata,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            switch (data.error) {
                case 0:
                    showProduct(data, ty);
                    break;
                case 1002:
                    showInfo(0, "search ERR please try again!");
                    break;
                default:
                    showInfo(0, "search ERR please try again!");
                    break;
            }

        },
        error: function () {
            showInfo(0, "search ERR please try again!");
        }

    });
}
//获取分类
function getOptionData(url, postdata) {
    $.ajax({
        url: url,
        data: postdata,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            switch (data.error) {
                case 0:
                    optionData(data);
                    break;
                case 1002:
                    showInfo(0, "search ERR please try again!");
                    break;
                default:
                    showInfo(0, "search ERR please try again!");
                    break;
            }

        },
        error: function () {
            showInfo(0, "search ERR please try again!");
        }

    });
}


function unCodeUrl(url, from) {
    var s, vurl;
    if (from == "\u0062\u0064\u0068\u0064" || from == "\u0071\u0076\u006f\u0064") {
        s = url.split("|");
        if (s[0].toLowerCase().indexOf("\u0065\u0064\u0032\u006b\u003a\u002f\u002f") == 0) {
            vurl = s[0] + "|" + s[1] + "|" + s[2] + "|" + s[3] + "|" + s[4].substring(0, s[4].length - 5) + s[4].substring(s[4].length - 4) + "|";
        } else {
            vurl = s[0] + "|" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "|" + s[2] + "|";
        }
    } else if (from == "\u0067\u0076\u006f\u0064") {
        s = url.replace("\u0067\u0076\u006f\u0064\u003a\u002f\u002f", "").split("/");
        vurl = "\u0067\u0076\u006f\u0064\u003a\u002f\u002f" + s[0] + "/" + s[1].substring(0, s[1].length - 5) + s[1].substring(s[1].length - 4) + "/" + s[2] + "/" + s[3];
    } else {
        vurl = url.substring(0, url.length - 5) + url.substring(url.length - 4);
    }
    return vurl;
}
function cleanWord(inStr) {
    var resultStr = inStr.replace(/\ +/g, "");//去掉空格
    resultStr = resultStr.replace(/[ ]/g, "");    //去掉空格
    resultStr = resultStr.replace(/[\r\n]/g, "");//去掉回车换行
    return resultStr;
}
function tableinfo(data) {

    if (data.length > 0) {
        divProduct.innerHTML = "<span>**************************</span>";
    } else {
        divProduct.innerHTML = "<span>没有数据!</span>";
    }
    try {


        var tb = document.createElement('table');
        // frameimg.setAttribute('style', 'width:100%');

        divProduct.appendChild(tb)
        var tr;
        var wdxmax = 4;
        var ww = (document.body.clientWidth * 0.8) / 4;
        var hh = ww * 1.5;

        for (var i = 0; i < data.length; i++) {
            var infodata = data[i];
            var idx_line = i % wdxmax;
            if (idx_line == 0) {
                tr = document.createElement('tr');
                tb.appendChild(tr);
                tr.textContent = gettitleName(platform);

                tr = document.createElement('tr');
                tb.appendChild(tr);
            }
            var td = document.createElement('td');
            // frameimg.setAttribute('style', 'width:200px');
            // td.style="width="+ww+"%;height=300px;";

            tr.appendChild(td);
            var div = getMovieInfoDiv(data[i], ww, hh);
            td.appendChild(div);
        }
    } catch (e) {
        lbl.textContent += e.toString();
    }
}
function getMovieInfoDiv(infodata, ww, hh) {
    var frameDiv = document.createElement('div');
    var framespan = document.createElement('span');
    framespan.innerText = "";
    frameDiv.appendChild(framespan);

    var frameimg = document.createElement('img');
    frameimg.setAttribute('src', infodata['imgurl']);

    frameimg.setAttribute('style', 'width:' + ww + 'px;height:' + hh + 'px;');
    frameDiv.appendChild(frameimg);

    var framespanm = document.createElement('span'); framespanm.innerText = "\r\n"; frameDiv.appendChild(framespanm);

    var frameA = document.createElement("a");
    frameA.innerHTML = infodata['title'];
    frameimg.setAttribute("onclick", "onShowMV('" + platform + "','" + infodata['href'] + "','" + infodata['title'].replace("'", "") + "')");
    frameA.setAttribute("onclick", "onShowMV('" + platform + "','" + infodata['href'] + "','" + infodata['title'].replace("'", "") + "')");
    frameDiv.appendChild(frameA);
    return frameDiv;
}
function cbx() {

}
//=================================================
//=显示播放列表================================================
//=================================================
//=================================================
function showPlayListUI(div, data) {
    var arrWayDiv = {};
    for (var i = 0; i < data.length; i++) {
        var playinfo = data[i]
        var waystr = playinfo['platform'];
        var waydiv = arrWayDiv[waystr];
        if (!waydiv) {
            waydiv = document.createElement('div');
            arrWayDiv[waystr] = waydiv;
            divProduct.appendChild(waydiv);
            waydiv.innerText = waystr + ":";
        }

        var radio = document.createElement("input");
        if (i == 0) {
            radio.setAttribute("checked", true);
        }
        radio.setAttribute("type", "radio");
        radio.setAttribute("onclick", "playradioChange()");
        radio.setAttribute("name", "tt");
        radio.setAttribute("value", playinfo.m3u8);


        waydiv.appendChild(radio);

        var span = document.createElement("span");
        span.innerHTML = data[i]['title'];
        waydiv.appendChild(span);


    }
    if (data.length > 0) {
        playradioChange();
    }

}
function playradioChange() {
    var movieOrgurl = $("input[name='tt']:checked").val();
    // var title = this.getTitle("title");
    // var obj = { link: movieOrgurl, key: key, title: title, platform: platform };
    // this.searchData("/getMovieSeeData", JSON.stringify(obj), "刷新成功", "1");

    lbl.textContent = "正在获取播放资源!"
    var tv = document.getElementById('divSee');
    tv.innerHTML = getPlayContent(movieOrgurl, "1");
}
/**
    *
    * @param href
    * @param ty 1 - iframe 2-video
    */
function getPlayContent(href, ty = '1') {
    if (ty == "2") {
        return "<video controls autoplay ><source src='" + href + "' autoplay='autoplay'></video>"
    } else {
        return "<iframe id = 'frameSee'  frameborder='0' onload='loadFrame()' src='" + href + "?rel=0&amp;autoplay=1" + "' style='width:100%;height:100%' allowfullscreen=''true' ></iframe>";
    }
}
