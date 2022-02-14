function initTitle(item, pm, sub = '') {
    item.innerText = gettitleName(pm) + (sub == "" ? "" : ":" + sub);
}
function gettitleName(platform) {
    var titlename = '';
    var pm = platform + "";
    switch (pm) {
        case '1':
            titlename = '顶点';
            break;
        case '2':
            titlename = '笔趣阁';
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
function searchData(url, postdata, msg, ty, fc) {
    $.ajax({
        url: url,
        data: postdata,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            switch (data.error) {
                case 0:
                    console.log("start show data")
                    fc(data, ty);
                    // showProduct(data,ty);
                    break;
                case 1002:
                    showInfo(0, "search ERR please try again!");
                    break;
                default:
                    alert('错误信息----' + data.data);
                    // divProduct.innerHTML = "<span>" + gettitleName(platform) + data.data + "</span>";

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
//显示搜索内容-----------------------------------------------------
function tableinfo(data) {
    divOption.innerHTML = "";
    if (data['search'].length > 0) {
        divProduct.innerHTML = "<span>----------------------------</span>" + data['search'].length;
    } else {
        divProduct.innerHTML = "<span>没有数据!</span>";
    }


    // frameimg.setAttribute('style', 'width:100%');
    if (data['search']) {

        showsearch(data['search']);

    }
    if (data['page']) {
        showPage(data['page']);
    }
}





//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
function showChapterList(dd) {
    try {
        var data = dd.data;
        var div_edit = $('#edit_inputs');
        $('#info-dialog-title').text(titletxt);

        if (data['pageSelect'].length > 0) {
            div_edit.innerHTML = "<span>******************</span>";
        } else {
            div_edit.innerHTML = "<span>没有数据!</span>";
        }
        var arrdata = data['pageList'];
        $('#edit_inputs').empty();
        for (var i = 0; i < arrdata.length; i++) {
            var infodata = arrdata[i];
            var div = document.createElement("div");
            var clickfcstr = "getBookInfo('" + infodata['link'] + "','" + infodata['title'] + "')";
            var btn = createbtn(infodata['title'], clickfcstr, "btn btn-outline-dark")
            div.appendChild(btn);
            div_edit.append(div);
        }
    } catch (e) {
        lbl.textContent = e.toString();
    }

    //章节列表分页页面选择
    var selectt = $("#selectPage");
    if (selectt[0].options.length == 0) {
        // selectt .setAttribute("onchange","getinfo('"+selectt[selectt.selectedIndex].value+"','"+infodata['title']+"','"+infodata['pf']+"')");
        var arrdata = data['pageSelect'];

        for (var i = 0; i < arrdata.length; i++) {
            var infodata = arrdata[i];
            var option = document.createElement("option");
            option.setAttribute("value", infodata['link']);
            var title = infodata["title"];
            option.setAttribute("onclick", "getinfo('" + infodata['link'] + "','" + title + "','" + "','" + platform + "')");
            option.appendChild(document.createTextNode(title));
            selectt[0].options.add(option);
        }
    }

}
function getBookInfo(link, tt) {
    templink = link;
    temptt = tt;
    if (tt) $("#divChapterName").text(tt);
    var obj = { link: link, title: titletxt, platform: platform };
    this.searchData("/getBookInfoData", JSON.stringify(obj), "刷新成功", showInfo, this.showBookInfo);

    divProduct.innerHTML = "加载中";
}
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示章节列表=========================================================================
//显示书本内容
var templink;
var temptt;
function showBookInfo(data) {

    try {
        var data = data.data;
        //顶部添加目录按钮
        lbl.textContent = data["chapterTitle"][0].title;

        var titleobj = data["chapterTitle"][0]
        if (!titleobj || titleobj.length <= 0) return;

        var topdiv = document.getElementsByClassName('navbar-brand')[0];
        // var txtstr = data["chapterTitle"][0][0]["txt"];
        // txtstr = txtstr.substring(0,10);
        // topdiv.innerHTML=(txtstr);

        if (document.getElementById("btnmulu") == null) {
            var btnmulu = document.createElement("button");
            btnmulu.innerText = "目录";
            btnmulu.setAttribute("onclick", "$('#edit').modal('show')");
            btnmulu.setAttribute("id", "btnmulu");
            btnmulu.setAttribute("class", "btn btn-secondary");
            topdiv.appendChild(btnmulu);

        }
        //====
        var txt = data["pageText"][0]["info"];
        divProduct.innerHTML = "";
        var divtop = document.createElement("div");
        var divdown = document.createElement("div");
        var divcontent = document.createElement("div");
        divProduct.appendChild(divtop);
        divProduct.appendChild(divcontent);
        divProduct.appendChild(divdown);
        divcontent.innerHTML = txt;
        addbtns(divtop, data);
        addbtns(divdown, data);

        $('#edit').modal('hide');
        localStorage.setItem("link" + mylink, templink);
        localStorage.setItem("tt" + mylink, temptt);
    } catch (err) {
        console.log(err)
    }




}
//添加内容界面的上一页下一页
function addbtns(div, data) {
    addbtn(div, data["textOption1"][0]);
    addbtn(div, data["textOption2"][0]);
}
function addbtn(div, data) {
    var link = data["link"];
    var txt = data["title"];
    var btn = createbtn(txt, "getBookInfo('" + link + "')", "btn btn-outline-primary")
    div.appendChild(btn);
}
function createbtn(txt, click, cla) {
    var btn = document.createElement("button");
    btn.innerText = txt;
    btn.setAttribute("onclick", click);
    btn.setAttribute("class", cla);
    return btn;
}
//显示书本内容=======================================================================================
function showPage(arrdata) {
    for (var i = 0; i < arrdata.length; i++) {
        var infodata = arrdata[i];
        var btn = document.createElement("BUTTON");
        divOption.appendChild(btn);
        btn.innerText = infodata['txt'];
        var platform = infodata["platform"];
        var kw = infodata["kw"];
        var page = infodata["page"];
        var clickinfo = "onShowPageOption('" + platform + "','" + kw + "','" + page + "')"
        btn.setAttribute("onclick", clickinfo);

        var framespanm = document.createElement('span');
        framespanm.innerHTML = "&nbsp&nbsp&nbsp";
        divOption.appendChild(framespanm);

    }
}
//======显示搜索数据=================================================
//======显示搜索数据=================================================
//======显示搜索数据=================================================
//======显示搜索数据=================================================
//======显示搜索数据=================================================
function showsearch(arrdata) {
    if (arrdata.length == 0) {
        alert("没有数据")
        divProduct.innerHTML = "<span>没有数据!</span>";

    }
    var tb = document.createElement('table');
    divProduct.appendChild(tb);



    var tr;
    var wdxmax = 4;

    var ww = (document.body.clientWidth * 0.8) / 4;
    var hh = ww * 1.5;

    for (var i = 0; i < arrdata.length; i++) {
        var infodata = arrdata[i];
        var idx_line = i % wdxmax;
        if (idx_line == 0) {
            tr = document.createElement('tr');
            tb.appendChild(tr);
        }

        var td = document.createElement('td');
        tr.appendChild(td);
        var div = getBookInfoDiv(infodata, ww, hh);
        td.appendChild(div);
    }

}
function getBookInfoDiv(infodata, ww, hh) {
   
    var frameDiv = document.createElement('div');
    var framespan = document.createElement('span');
    framespan.innerText = "";
    frameDiv.appendChild(framespan);

    var frameimg = document.createElement('img');
   
    frameimg.setAttribute('src', infodata['img']);

    frameimg.setAttribute('style', 'width:' + ww + 'px;height: ' + hh + 'px;');
    frameDiv.appendChild(frameimg);

    var framespanm = document.createElement('span'); framespanm.innerText = "\r\n"; frameDiv.appendChild(framespanm);

    var frameA = document.createElement("a");
    frameA.innerHTML = infodata['title'];
   
    var str = JSON.stringify(infodata) ;
    var clickstr = "showbookinfo1(" +str+")";// infodata["platform"] + "','" + infodata['img'] + "','" + infodata['link'] + "','" + strtitle + "','" + strinfo + "','" + master + "')";
    frameimg.setAttribute("onClick", clickstr);
    frameA.setAttribute("onClick", clickstr);
    frameDiv.appendChild(frameA);

    // var frameupdate = document.createElement("div");
    // frameupdate.innerHTML = infodata['update'];
    // frameupdate.style.fontSize=3;
    // frameDiv.appendChild(frameupdate);
    return frameDiv;
}
//显示书本信息
function showbookinfo1(infodatastr)//platformid, img, link, title, info, master) {
 {   

    var infodata = infodatastr;//JSON.parse(infodatastr);
    $('#edit2').modal('show');
    document.getElementById('info-dialog-title').innerText = infodata.title;
    document.getElementById('info-dialog-master').innerText = "作者：" + infodata.master;
    document.getElementById('info-dialog-info').innerText = infodata.info;

    temp_platform = infodata.platform;
    temp_img = infodata.img;
    temp_link = infodata.link;
    temp_title = infodata.title;
    temp_info = infodata.info;
    temp_master = infodata.master;
}
var temp_platform;
var temp_img;
var temp_link;
var temp_title;
var temp_info;
var temp_master;
function onseebookbtnclick() {
    onShowMV(temp_platform, temp_img, temp_link, temp_title, temp_info, temp_master);
}
function deletetemp() {
    removefromlocallist(temp_link);
}
function onShowMV(platformid, img, link, title, info, master) {
    addtoLocalList(platformid, img, link, title, info, master);
    var asincode = $('#txt_asin_code')[0].value;
    window.location.href = '/cms/book_online_info.html?platform=' + platformid + '&&link=' + link + "&&title=" + title + "&&key=" + asincode;
}
function cbx() {

}
function changebackcolor(colorid) {

    localStorage.setItem("colorid", colorid);

    var bkcolor = "yellow";
    var fontcolor = "red";
    document.getElementById("styles").style.background = "";
    switch (colorid) {
        case "1":
            bkcolor = "#1a1a1a";
            fontcolor = "#bebebe";
            break;
        case "2":
            bkcolor = "#bebebe";
            fontcolor = "#1a1a1a";
            break;
        case "3":
            bkcolor = "#c1c1c1";
            fontcolor = "#000000";
            document.getElementById("styles").style.background = "url('http://www.hongjim.com/xddz/jj.jpeg')";
            break;
        case "4":
            bkcolor = "#005c00";
            fontcolor = "#bebebe";
            break;
    }
    document.getElementById("styles").style.backgroundColor = bkcolor;
    tcolor("styles", fontcolor)
    // $('#edit2').modal('hide');

}
function changefamily(fid) {

    localStorage.setItem("familyid", fid)
    var fm = "黑体";
    switch (fid) {
        case "1": fm = "serif"; break;
        case "2": fm = "微软雅黑"; break;
        case "3": fm = "times"; break;
        case "4": fm = "arial"; break;
    }
    tfontfamily("styles", fm);
    // $('#edit2').modal('hide');

}

//==================================================================================================
function tcolor(trgt, color) {
    if (!document.getElementById) {
        return
    }
    var d = document, cEl = null, i, j, cTags;
    if (!(cEl = d.getElementById(trgt))) cEl = d.getElementsByTagName(trgt)[0];
    cEl.style.color = color;
    for (i = 0; i < tgs.length; i++) {
        cTags = cEl.getElementsByTagName(tgs[i]);
        for (j = 0; j < cTags.length; j++) {
            cTags[j].style.color = color;
        }
    }
}
function tfontfamily(trgt, family) {
    if (!document.getElementById) {
        return
    }
    var d = document, cEl = null, i, j, cTags;
    if (!(cEl = d.getElementById(trgt))) cEl = d.getElementsByTagName(trgt)[0];
    cEl.style.fontFamily = family;
    for (i = 0; i < tgs.length; i++) {
        cTags = cEl.getElementsByTagName(tgs[i]);
        for (j = 0; j < cTags.length; j++) {
            cTags[j].style.fontFamily = family;
        }
    }
}
function changeSize(size) {

    localStorage.setItem("sizeid", size);
    tsize('body', size);
    // $('#edit2').modal('hide');
}
var tgs = new Array('td', 'tr');
var szs = new Array('10px', '12px', '14px', '16px', '18px', '20px', '22px');
var startSz = 2;
function tsize(trgt, inc) {
    if (!document.getElementById) {
        return
    }
    var d = document, cEl = null, sz = startSz, i, j, cTags;
    //sz += inc;
    sz = inc;
    if (sz < 0) {
        sz = 0;
    }
    if (sz > 6) {
        sz = 6;
    }
    startSz = sz;
    if (!(cEl = d.getElementById(trgt))) cEl = d.getElementsByTagName(trgt)[0];
    cEl.style.fontSize = szs[sz];
    for (i = 0; i < tgs.length; i++) {
        cTags = cEl.getElementsByTagName(tgs[i]);
        for (j = 0; j < cTags.length; j++) {
            cTags[j].style.fontSize = szs[sz];
        }
    }
}
//==========================================================================================
function removefromlocallist(link) {
    var datastr = localStorage.getItem("seelist");
    if (!datastr) {
        datastr = "";
    }
    var newdatastr = "";
    var find = 0;
    var datastrarr = datastr.split(';');
    for (var i = 0; i < datastrarr.length; i++) {
        var str = datastrarr[i];
        if (str.split(',')[2] == link) {
            find = 1;
        } else {
            newdatastr += ";" + str;
        }
    }
    alert((find==1)?"删除一条数据":"没找到相关数据");
    if(find==1){
        localStorage.setItem("seelist", newdatastr);
        this.showlocalList();
    }
}
function showlocalList() {
    var arrdata = getlocalListdata();
    if (arrdata) {
        divProduct.innerHTML = "<span>*******************************历史浏览记录************************</span>" + arrdata.length;
        this.showsearch(arrdata);
    }
}
function addtoLocalList(platform, img, link, title, info, master) {
    var datastr = localStorage.getItem("seelist");
    if (!datastr) {
        datastr = "";
    }
    var newdatastr = "";
    var hasadd = 0;
    var datastrarr = datastr.split(';');
    for (var i = 0; i < datastrarr.length; i++) {
        var str = datastrarr[i];
        if (str != "") {
            if (str.indexOf(link) == -1) {
                newdatastr += ";" + str;
            } else {
                if (hasadd == 0) {
                    newdatastr += ";" + platform + "," + img + "," + link + "," + title + "," + info + "," + master;
                    hasadd = 1;
                }
            }
        }
    }
    if (hasadd == 0) {
        newdatastr += ";" + platform + "," + img + "," + link + "," + title + "," + info + "," + master;
    }
    localStorage.setItem("seelist", newdatastr);

}
function getlocalListdata() {
    var arrdatastr = localStorage.getItem("seelist");
    if (!arrdatastr) {
        return null;
    }
    var arrstr = arrdatastr.split(";");
    var arrout = [];
    for (var i = 0; i < arrstr.length; i++) {
        if (arrstr[i] != "") {
            var infoarr = arrstr[i].split(',');
            var objout = {};
            arrout.push(objout);
            objout["platform"] = infoarr[0];
            objout["img"] = infoarr[1];
            objout["link"] = infoarr[2];
            objout["title"] = infoarr[3];
            objout["info"] = infoarr[4];
            objout["master"] = infoarr[5];
        }
    }
    if (arrout.length > 0) {
        return arrout;
    }

    return null;
}