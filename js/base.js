
  var client_id = "cd05e2b8-8d51-45b2-9814-c7beecd9c059";
  var client_sercret = "ca677811085f1b29786b49e569994cb18a94f3e0d699f998f91faee83a4e14db";
  var access_token_key = "access_token_key";
  var assets_key =  "assets_key";
  var trace_id;//当前支付请求的trace,用于通信
  var asset_id;//方法间通信
  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

/**
 * 缓存access_token
 * @param {*} accessToken 
 */
function cacheAccessToken(accessToken) {
    cache(access_token_key,accessToken);
}

/**
 * 获取缓存的access_token
 */
function getCacheAccessToken() {
    return getCache(access_token_key);
}

/**
 * 缓存资产数据
 * @param {*} data 
 */
function cacheAssets(data) {
    cache(assets_key,JSON.stringify(data))
}

/**
 * 获取缓存的资产数据
 */
function getCacheAssets(){
    var data = getCache(assets_key);
    if(!!data){
        return JSON.parse(data);
    }
    return;
}

function cache(key,data) {
    window.localStorage.setItem(key,data);
}

function getCache(key){
    return window.localStorage[key];
}



function auth() {
    window.open("https://mixin.one/oauth/authorize?client_id=cd05e2b8-8d51-45b2-9814-c7beecd9c059&scope=PROFILE:READ+ASSETS:READ","_self");
}