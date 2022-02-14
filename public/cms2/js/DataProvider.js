var  urlinit,urlupdate,urldelete,urladd;
var cols;
var pageParam;
function seturl(uu)
{
    this.refreshurl = uu;
}
function setColums(arr, primaryKey = 'id')
{
    this.cols = [];
    for(var i  = 0 ; i< arr.length;i++)
    {
        this.cols.push({"data":arr[i]});
    }
    this.primaryKey = primaryKey
}
function addInputs(ll)
{
    for(var i =0;i<cols.length;i++)
    {
        var ds = i<ll?"disabled='true'":"";
        var str ="<div><span>"+cols[i].data+"</span><input id='info"+i+"' type='text' value='' style='width:100%' "+ds+"></div>";
        $('#edit_inputs').append(str);
    }
}

function initURL(uinit,uupdate,udelete,uadd)
{
    this.urlinit=uinit;
    this.urlupdate=uupdate;
    this.urldelete=udelete;
    this.urladd=uadd;
}


function loadData(dapp, pageSize = -1, pageIndex = 0)
{
    this.pageParam = dapp;
    var objToBePost = this.getAllObj();
    objToBePost.pageSize = pageSize;
    objToBePost.pageIndex = pageIndex;
    var t = $('#dataTable').DataTable({
        ajax: {
            url: this.urlinit,
            data: objToBePost,
            type:"post",
        },
        "columns": this.cols,
        paging: pageSize != -1
    });
    this.addEvents();
}

function addEvents()
{
    var table = $('#dataTable').DataTable();
    $('#dataTable tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
        // var data = table.rows('.selected').data();
    });
    $('#dataTable tbody').on('dblclick', 'tr', function (){

        $('#info-dialog-title').html('title');//$(this).find("td").eq(0).html());

        for(var i = 0 ; i<20;i++)
        {
            var infotxt =$('#info'+i);
            var infostr = $(this).find("td").eq(i).html();
            var param
            if((!infostr || infostr.substring(0,2)=="No")&& i == 0)
            {
                infostr = "新增不需要填" ;
            }
            if( infotxt){
                infotxt.val(infostr);
            }
            var param1 = pageParam["param1"];
            var param2 = pageParam["param2"];

            if((!infostr ) && i == 1 && param1)
            {
                infotxt.val(param1);
            }
            if((!infostr ) && i == 2 && param2)
            {
                infotxt.val(param2);
            }
        }
        $('#edit').modal('show');
    });
    $('#btn-edit').on('click',this.doUpdate.bind(this)  );
    $('#btn-delete').on('click',this.doDelete.bind(this)  );
    $('#btn-add').on('click',this.doAdd.bind(this)  );
}
function doAdd()
{
    this.doAjax(getInptObj(),this.urladd,"添加成功");
}
function doDelete()
{
    var id =$('#info0').val();
    var data = {tableName:this.tableName}
    data[this.primaryKey] = id
    this.doAjax(data,this.urldelete,"删除成功");
}
function doUpdate()
{
    var id =$('#info0').val();
    var idx=0;
    var dapp = getInptObj();
    dapp[this.primaryKey] = id;
    this.doAjax(dapp,this.urlupdate,"修改成功");
}
function getInptObj()
{
    var idx=0;
    var dapp = {tableName:this.pageParam["tableName"], primaryKey: this.primaryKey};
    for(var k in this.cols)
    {
        var info = cols[k].data;
        if(idx !=0)
        {
            dapp[info] =$('#info'+idx).val()
        }
        idx ++;
    }
    return dapp;
}
function getAllObj()
{
    var dapp = {tableName:this.pageParam["tableName"]};
    for(var kk in this.pageParam)
    {
        if(kk!="tableName")
        {
            var k = kk.substr(kk.length-1,1)
            var info = cols[k].data;
            dapp[info]=this.pageParam[kk];
        }

    }
    return dapp;
}

function doAjax(dapp,url,tip)
{
    $.ajax({
        url: url,
        data: dapp,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.error == 0) {
                if(tip==""){
                    showAlert(data.message);
                }else{
                    showAlert(tip);
                }

                setTimeout("location.reload()",10)
            } else if(data.error==401) {
                notLogin(data);
            }else{
                showAlert('错误，请稍后重试');
            }
        },
        error: function () {
            showAlert('错误，请稍后重试');
        }
    });
}


//提示框
function showAlert(info){
    alert(info);
}

function getQueryString(name) {
    var result = window.location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}


function loadXml() {
    //获取文件
    var file = $("#ipt")[0].files[0];
    //创建读取文件的对象
    var reader = new FileReader();
    //创建文件读取相关的变量
    var txt;
    var pgg = this.getAllObj();
    //为文件读取成功设置事件
    reader.onload = function (e) {
        txt = e.target.result.toString();

        var dapp = {xml:txt};
        for(var key in pgg)
        {

            dapp[key] = pgg[key];

        }
        doAjax(dapp,"/fileAdd","添加成功");
    };
    //正式读取文件
    // reader.readAsDataURL(file);
    //将文件以文本形式读入页面
    reader.readAsText(file, "gb2312");
}

