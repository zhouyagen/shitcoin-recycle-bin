$.when( $.ready ).then(function() {
    console.log("ready");
    var token = getCacheAccessToken();
    console.log(token);
    $('#token').val(token);
  });