var access_token;
$.when( $.ready ).then(function() {
    $.support.cors = true;
    console.log("ready");
    var code = getUrlParameter("code");
    var error = getUrlParameter("error");
    console.log(code + ":" + error);
    if(!!code){
        getAccessToken(code);
    }
  });

  function getAccessToken(code) {
      var data = {
        "client_id": client_id,
        "code": code,
        "client_secret": client_sercret
      }
      $.ajax({
        url: "https://api.mixin.one/oauth/token",
        type: "POST",
        dataType: "json",
        crossDomain: true,
        contentType:"application/json",
        data:JSON.stringify(data),
        success: function (data) {
            var dataObj = data["data"];
            if(!!dataObj){
              access_token = dataObj["access_token"];
              console.log(access_token);
            }else{
                //test
                access_token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI5MjkwZWQ4YS01ZTk2LTQ5MzMtOWQ2ZS0yNDE5ZThiZDA4NjkiLCJleHAiOjE1ODU1NTk5NDcsImlhdCI6MTU1NDAyMzk0NywiaXNzIjoiNTIyYmQzNjctZjM1NS00MTk0LThkODUtNDM2NjM4MjI3OTZkIn0.nZd-BIR2SlMayTTMHtPO3WUouhlnOXoxB29Po5bd0iT_exi4cwS9PKwck7B7MhrzBba6y0LOn4ZiFj3o2id5tR4CbSYo8NJUeqJRmQGMAiev-g53baA7Pzz-iY4WrdqLx8nuQ_W-e64vLL8O5VvMuTJ3cdoUqP3ocVmg7ep4OPk";
            }
            updateShitcoinList();
        }
    });
  }


  function clean(url){
      $("#donedialog").addClass("show");
      window.open(url);
  }

  function updateShitcoinList() {
      var auth = "Bearer " + access_token;
      $("#donedialog").removeClass("show");
      $.ajax({
          url: "https://api.mixin.one/assets",
          dataType: "json",
          headers: {
              "Authorization": auth
          },
          success: function (data) {
              var dataObj = data["data"];
              var shitcoins = [];
              if (!!dataObj) {
                  for (index in dataObj) {
                      var asset = dataObj[index];
                      if (asset["price_btc"] == '0' && asset["price_usd"] == '0') {
                          asset["cleanUrl"] = requestPayment(asset["asset_id"], asset["balance"]);
                          shitcoins.push(asset);
                      }
                  }
              }

              var html = '';
              if (shitcoins.length == 0) {
                  html = "你的钱包很干净";
              } else {
                  for (index in shitcoins) {
                      var shitCoin = shitcoins[index];
                      html += '<li>' +
                          '<div class="ui-avatar">' +
                          '<span style="background-image:url(' + shitCoin['icon_url'] + '"></span>' +
                          '</div>' +
                          '<div class="ui-list-info ui-border-t">' +
                          '<h4 class="ui-nowrap">' + shitCoin['symbol'] + '</h4>' +
                          '<p>' + shitCoin['balance'] + '</p>' +
                          '</div>' +
                          '<div class="ui-btn" onclick = "clean(\'' + shitCoin["cleanUrl"] + '\')">clean</div>' +
                          '</li>';
                  }
              }
              $("#shitCoinList").html(html);
          }
      });
 }


 function closeDialog() {
    $("#donedialog").removeClass("show");
 }

 function requestPayment(assetId,amount) {
    return "https://mixin.one/pay?recipient="+ client_id +"&asset="+ assetId +"&amount="+ amount +"&trace="+ $.uuid() +"&memo="+ encodeURI("clean shit coin");
 }
