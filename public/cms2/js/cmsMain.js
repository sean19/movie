function checkLogin(url)
{
    $.ajax({
        url: url,
        data: {},
        type: 'post',
        cache: false,
        dataType: 'json',
        success: function (data) {
            if (data.error == 0) {
            } else if(data.error==401) {
                notLogin();
            }else{
                notLogin();
            }
        },
        error: function () {
            notLogin();
        }
    });
}
function notLogin(){
    alert("亲，未登录！或者帐号登录超时");
    window.location.href = "/cms/login.html"
}