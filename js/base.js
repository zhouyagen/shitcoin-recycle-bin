
  var client_id = "cd05e2b8-8d51-45b2-9814-c7beecd9c059";
  var client_sercret = "ca677811085f1b29786b49e569994cb18a94f3e0d699f998f91faee83a4e14db";
  var access_token_key = "access_token_key";

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

function cacheAccessToken(accessToken) {
    window.localStorage.setItem(access_token_key,accessToken);
}

function getCacheAccessToken() {
    return window.localStorage[access_token_key];
}

function auth() {
    window.open("https://mixin.one/oauth/authorize?client_id=cd05e2b8-8d51-45b2-9814-c7beecd9c059&scope=PROFILE:READ+ASSETS:READ","_self");
}