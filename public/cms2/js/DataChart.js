function showChart(url,dapp,clumname,infoarr)//info[{lable,datakey,type,color}]
{
    $.ajax({
        url: url,
        data: dapp,
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if(data.error=401)
            {

            }
            var colums = [];
            var ddsajax = data.data;
            if(ddsajax==null)return;
            var datas = [];
            for(var m =0;m<infoarr.length;m++)
            {
                var info=infoarr[m];
                var lablename = info["lable"];
                var type = info["type"];
                var datakey = info["datakey"];
                var arrdata = [];
                var sam = 0;
                for(var i =0;i<ddsajax.length;i++)
                {
                    var datacome =ddsajax[i];
                    if(colums.length<ddsajax.length){colums.push(datacome[clumname]);}
                    var val = datacome[datakey];
                    sam  +=val;
                    if(type=="sam"){
                        arrdata.push(sam);
                    }else{
                        arrdata.push(val);
                    }

                }
                var infodata = getData(lablename,arrdata,info["color"]);
                datas.push(infodata);
            }
            setchart(colums,datas);
        },
        error: function () {
            showAlert('错误，请稍后重试');
        }
    });


}
function getData(lable,data,linecolor="rgba(12,117,216,1)")
{
    if(linecolor=="")
    {
        linecolor="rgba(12,117,216,1)"
    }
   return {
        label: lable,
        lineTension: 0.3,
        backgroundColor: "rgba(2,117,216,0.2)",
        borderColor: linecolor,//"rgba(12,117,216,1)",
        pointRadius: 5,
        pointBackgroundColor: "rgba(2,117,216,1)",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(2,117,216,1)",
        pointHitRadius: 20,
        pointBorderWidth: 2,
        data:data
    };
}
function setchart(colums,datas){
    //==================================================
    var ctx = document.getElementById("myAreaChart");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        labels: colums,
        data: {
            labels: colums,
            datasets: datas,
        }
    });
    //==================================================
}