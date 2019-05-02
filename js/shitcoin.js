 $.when($.ready).then(function () {
     $.support.cors = true;
     console.log("ready");
     var access_token = getCacheAccessToken();
     console.log(access_token);
     var code = getUrlParameter("code");
     if (!access_token  || !!code) {
         console.log("no cache");         
         var error = getUrlParameter("error");
         console.log(code + ":" + error);
         if (!!code) {
             getAccessToken(code);
         }
     } else {
         console.log("cache access_token");
         var shitCoins = getCacheAssets();
         if (!!shitCoins) {
             showshitCoins(shitCoins); //展示
         } else {
             updateShitcoinList();
         }
     }
 });

  function getAccessToken(code) {
      var data = {
          "client_id": client_id,
          "code": code,
          "client_secret": client_sercret
      }
      loading();
      $.ajax({
          url: "https://api.mixin.one/oauth/token",
          type: "POST",
          dataType: "json",
          crossDomain: true,
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function (data) {
              var dataObj = data["data"];
              if (!!dataObj) {
                  access_token = dataObj["access_token"];
                  console.log(access_token);
              }
              cacheAccessToken(access_token);
              updateShitcoinList();
          }
      });
  }


  function clean(assetId, amount) {
      $("#" + assetId + " .ui-btn").addClass("disabled");
      showDoneDialog();
      trace_id = $.uuid();
      asset_id = assetId;
      var url = "https://mixin.one/pay?recipient=" + client_id + "&asset=" + assetId + "&trace=" + trace_id + "&amount=" + amount + "&memo=" + encodeURI("clean shit coin");
      window.open(url);
  }

  function checkPayment() {
    if(!!trace_id){
        //隐藏
        $("#" + asset_id).hide();
        updateCache(asset_id);
        closeDialog();
    }
  }

  function updateCache(assetId) {
      var shitCoins = getCacheAssets();
      var index = shitCoins.length;
      while (index-- ) {
          var shitCoin = shitCoins[index];
          if(!!shitCoin && shitCoin["asset_id"] == assetId){
              shitCoins.splice(index,1)
          }
      }
      cacheAssets(shitCoins);
      
  }

  function updateShitcoinList() {
      var authtoken = "Bearer " + getCacheAccessToken();
      closeDialog(); //关闭询问弹窗
      loading(); //加载loading
      $.ajax({
          url: "https://api.mixin.one/assets",
          dataType: "json",
          headers: {
              "Authorization": authtoken
          },
          success: function (data) {
              loaded(); //关闭loading
              var dataObj = data["data"];
              var shitCoins = [];
              if (!!dataObj) {
                  for (index in dataObj) {
                      var asset = dataObj[index];
                      if (asset["price_btc"] == '0' && asset["price_usd"] == '0') {
                          shitCoins.push(asset);
                      }
                  }
              } else if (!!data["error"]) {
                  //过期，重新授权
                  auth();
              }
              cacheAssets(shitCoins); //缓存
              showshitCoins(shitCoins); //展示
          }
      });
  }

 function showshitCoins(shitCoins) {
    var html = '';
    if (shitCoins.length == 0) {
        html = "你的钱包很干净";
    } else {
        for (index in shitCoins) {
            var shitCoin = shitCoins[index];
            html += '<li id="' + shitCoin["asset_id"] + '">' +
                '<div class="ui-avatar">' +
                '<span style="background-image:url(' + shitCoin['icon_url'] + '"></span>' +
                '</div>' +
                '<div class="ui-list-info ui-border-t">' +
                '<h4 class="ui-nowrap">' + shitCoin['symbol'] + '</h4>' +
                '<p>' + shitCoin['balance'] + '</p>' +
                '</div>' +
                '<div class="ui-btn" onclick = "clean(\'' + shitCoin["asset_id"] + '\',\''+ shitCoin["balance"] + '\')">clean</div>' +
                '</li>';
        }
    }
    $("#shitCoinList").html(html);
 }


 function showDoneDialog() {
    $("#donedialog").addClass("show");
 }

 function closeDialog() {
    $("#donedialog").removeClass("show");
 }

 function loading(){
     $("#loading").addClass("show");
 }

 function loaded(){
    $("#loading").removeClass("show");
 }
