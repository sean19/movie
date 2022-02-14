function showAlert(info) {
    var b = jqueryAlert({
        'content': info,
        'contentTextAlign': 'center',
        'height': '130',
        'width': '300',
        'title': '提示',
        'modal': true,
        'bodyScroll': true,
        'buttons': {
            '确定': function
                () {
                b.close();
            }
        }
    })
}
function getQueryString(url, name)
{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = url.substr(1).match(reg);
    if(r != null){
        return decodeURIComponent(r[2]);
    }
    return null;
}
function windowLoaded( func ) {
    window.addEventListener('load',func );
}

function post(url,data,success){
    $.ajax( {
        url:url,
        data:data,
        type:'post',
        cache:false,
        dataType:'json',
        success:success,
        error:function(){
            console.log('错误，请稍后重试');
        }
    });
}

/**
 * -1 未判断过； 0 不是微信平台打开的； 1 是微信平台打开的
 */
var weixinStatus = -1;
/**
 * 是否是微信平台打开的
 */
function isWeiXin() {
    if (1 == weixinStatus) {
        return true;
    }
    if (0 == weixinStatus) {
        return false;
    }
    if (null == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {// 0 不是微信平台打开的
        weixinStatus = 0;
        return false;
    }
    weixinStatus = 1;
    return true;
}

function htmlEncode(html) {
    return document.createElement('a').appendChild(
        document.createTextNode(html)).parentNode.innerHTML;
}
function addTagLoadEvent( tag, t )
{
    if(tag.readyState)
    {
        tag.onreadystatechange = function()
        {
            if( "loaded" == tag.readyState || "complete" == tag.readyState )
            {
                tag.onreadystatechange = null;
                t && t();
            }
        };
    }
    else
    {
        tag.onload = function()
        {
            t && t();
        };
    }
}

function wechatShare(obj) {
   wechatShareTimeline(obj);
   wechatShareAppMessage(obj);
   onMenuShareQQ(obj);
}
/**“分享到朋友圈”*/
function wechatShareTimeline(obj) {
    var message0 = {};
    message0.title = obj.title + obj.desc;
    message0.link = obj.url;
    message0.imgUrl = "http://c.vfangtuan.com/logo64.png";
    wx.onMenuShareTimeline(message0);
}
/**“分享给朋友”*/
function wechatShareAppMessage(obj) {
    var message = {};
    message.title = obj.title;
    message.desc = obj.desc;
    message.link = obj.url;
    message.imgUrl = "http://c.vfangtuan.com/logo64.png";
    message.type = '';
    message.dataUrl = '';
    wx.onMenuShareAppMessage(message);
}
/**“分享到QQ”*/
function onMenuShareQQ(obj) {
        var message2 = {};
        message2.title = obj.title;
        message2.desc = obj.desc;
        message2.link = obj.url;
        message2.imgUrl = "http://c.vfangtuan.com/logo64.png";
        message2.type = '';
        message2.dataUrl = '';
        wx.onMenuShareQQ(message2);
}
function addScript(scriptURL) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.charset = "UTF-8";
    a.src = scriptURL;
    document.head.appendChild(a);
    return a;
}

function jsapiTicket() {
    $.ajax({
        url: '/jsapi_ticket',
        data: {
            url: location.href.split('#')[0],
        },
        type: 'get',
        cache: false,
        dataType: 'json',
        success: function (data) {
            jsApiSuccess(data)
        },
        error: function () {
            // alert('获取jsapi ticket 错误');
        }
    });
}
var wxReadyCall = [];
function jsApiSuccess(data) {
    wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: [
            'checkJsApi',
            'openLocation',
            'getLocation',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ'
        ]
    });
}


windowLoaded( function() {
    var unionId = getQueryString( window.location.search, "unionId" );
    if( window.localStorage )
    {
        if( unionId != null && unionId != "" )
        {
            try
            {
                window.localStorage.setItem( "unionId", unionId );
            }
            catch(e)
            {

            }
        }
        else
        {
            unionId = window.localStorage.getItem( "unionId" );
        }
    }

    if( window.vfangApp )
    {
        window.vfangApp.setUnionId( unionId );
    }
    else if( window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.vfangApp )
    {
        window.webkit.messageHandlers.vfangApp.postMessage( [ "setUnionId", unionId ] );
    }

    if( isWeiXin() )
    {
        var tag = addScript("http://res.wx.qq.com/open/js/jweixin-1.2.0.js");
        addTagLoadEvent( tag, function(){
            var desc = "晒一晒，你的房产升值了多少？";
            var href = window.location.href.split( "unionId" )[0];
            setTimeout( function () {
                wx.ready(function() {
                    var obj = { title:"都市圈购房:", desc:desc, url:href };
                    wechatShare( obj );
                    for( var i=0;i<wxReadyCall.length; i++)
                    {
                        wxReadyCall[i]();
                    }
                } );
                jsapiTicket();
            }, 200 );
        });
    }
});
//定位相关
function getAddress(success,error){
    getAddressSuccess = success;
    getAddressError = error;

    // get_address( {latitude:"22.579866",longitude:"113.907814"});

    if( isWeiXin() )
    {
        wx.ready(function(){
            wx.getLocation({
                success: get_address,
                cancel: function (res) {
                    alert('用户拒绝授权获取地理位置');
                },
                fail:function (res) {
                    showAlertInfo('微信授权获取地理位置失败，请稍后尝试！');
                }
            });
        });
    }
    else
    {
        callApp( "startUpdatingLocation" )
    }
}

var getAddressSuccess;
var getAddressError;
var radius = 50;
var policy = 2;
function get_address(res) {
    var location=res.latitude+","+res.longitude;
    radius += 50;
    if( radius > 500 )
    {
        policy = policy == 2 ? 1 : 2;
        radius = 50;
    }
    $.ajax( {
        url:'http://it.vfangtuan.com:8080/p/main/get_address/',
        data:{
            location:location,
            radius:radius,
            policy:policy
        },
        type:'post',
        cache:false,
        dataType:'json',
        success:getAddressSuccess,
        error:function(){
            if( getAddressError )
            {
                getAddressError();
            }
        }
    });
}

/**
 * 以下这段代码是用于根据移动端设备的屏幕分辨率计算出合适的根元素的大小
 * 当设备宽度为375(iPhone6)时，根元素font-size=12px; 依次增大；
 * 限制当为设备宽度大于768(iPad)之后，font-size不再继续增大
 * scale 为meta viewport中的缩放大小
 */
!(function (doc, win) {
    var docEl = win.document.documentElement;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    /**
     * ================================================
     *   设置根元素font-size
     * 当设备宽度为375(iPhone6)时，根元素font-size=12px;
     × ================================================
     */
    var refreshRem = function () {
        var clientWidth = win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
        if (clientWidth)
        {
            var fz;
            var width = clientWidth;
            fz = 12 * width / 375;
            docEl.style.fontSize = fz + 'px';
        }
    };
    if (doc.addEventListener)
    {
        win.addEventListener(resizeEvt, refreshRem, false);
        doc.addEventListener('DOMContentLoaded', refreshRem, false);
        refreshRem();
    }
})(document, window);
