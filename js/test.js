$.when($.ready).then(function () {
    //本地测试使用
    var access_token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiJmYWVkM2Y5Mi1iMjk5LTQ2NDEtODg1My0wNzM5YjE5NDY2MjUiLCJleHAiOjE1ODU1NzE4NDIsImlhdCI6MTU1NDAzNTg0MiwiaXNzIjoiY2QwNWUyYjgtOGQ1MS00NWIyLTk4MTQtYzdiZWVjZDljMDU5In0.RuPUnwtxiXpVbdq0G52X7KLwMYt_41gLLHBtYlpFVUzDYSOTBOOx0EneI0TP9uHet5UvmgvySux_XPxQFbnpzamtmxp4LvtBlHoLav9nLIAEDmVOGJJf4mKjFdZ8ouCGTLZjvsQSy7orSl1Pb2omJz1NY21hy3iLpudPsnHMQ68";
    cacheAccessToken(access_token);

    console.log(getCacheAccessToken());
    
});
