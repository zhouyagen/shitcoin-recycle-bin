$.when( $.ready ).then(function() {
    console.log("ready");
    window.open("https://mixin.one/oauth/authorize?client_id=cd05e2b8-8d51-45b2-9814-c7beecd9c059&scope=PROFILE:READ+ASSETS:READ","_self");
  });