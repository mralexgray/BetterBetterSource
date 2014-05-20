if (window.top === window) {
    function getOriginalSource(callback){
        var request = new XMLHttpRequest();
        request.onreadystatechange = function(){
            if (request.readyState == 4) {
                if (request.status == 200) {
                    callback(request.responseText);
                }
            }
        };
        request.open("GET", window.location.href);
        request.send(null);
    }
    safari.self.addEventListener("message", function(event){
        if (event.name == "userRequestedGeneratedSource") {
            // TODO: backport pre-html-tag solution
            getOriginalSource(function(result){
                safari.self.tab.dispatchMessage("GeneratedSourceReady", [document.documentElement.outerHTML, result]);
            });
        }
        if (event.name == "userRequestedOriginalSource") {
            getOriginalSource(function(result){
                safari.self.tab.dispatchMessage("OriginalSourceReady", result);
            });
        }
    }, false);
}