
  var client_id = "cd05e2b8-8d51-45b2-9814-c7beecd9c059";
  var client_sercret = "ca677811085f1b29786b49e569994cb18a94f3e0d699f998f91faee83a4e14db";
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
