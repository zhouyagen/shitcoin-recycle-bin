$.when( $.ready ).then(function() {
    console.log("ready");
    var token = getCacheAccessToken();
    console.log(token);
    
    if(!token){
      auth();
    }else{
      window.open("./shitcoin.html","_self");
    }
  });
