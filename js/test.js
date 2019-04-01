$.when($.ready).then(function () {
    //本地测试使用
    var access_token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI2YTYyZjNhNy03NDZjLTQ4MTMtODc0OC1jNTdjYzYxNTM5YTMiLCJleHAiOjE1ODU1NzI2MjgsImlhdCI6MTU1NDAzNjYyOCwiaXNzIjoiY2QwNWUyYjgtOGQ1MS00NWIyLTk4MTQtYzdiZWVjZDljMDU5In0.uIMeNa-ATYVu_RPg1elo3yFyl3dfRj5VSXOCNUHbCe52V3n_QpwT_uurV4tsjdpoZgL6nH2tAq0MSmeSJYWphBTs9fRJfyFAa7rAjkepBGbVECMtjC5dAdKc4IZA_OPkg8MfzpNnLVq6b8yJastFfEUiFuOG4HdiGjOx0Usrt8k";
    cacheAccessToken(access_token);

    console.log(getCacheAccessToken());
    
});
