(function(J, undefined) {
    var DEFAULT_FPS = 60,
        NOOP = function(){},
        requestAnimationFrame = (function() {
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback){
                    return window.setTimeout(callback, 1000 / DEFAULT_FPS);
                };
        })(),
        cancelAnimationFrame = (function (){
            return  window.cancelAnimationFrame       ||
                window.webkitCancelAnimationFrame ||
                window.mozCancelAnimationFrame    ||
                window.oCancelAnimationFrame      ||
                window.msCancelAnimationFrame     ||
                function(id){
                    return window.clearTimeout(id);
                };
        })();





})(J)