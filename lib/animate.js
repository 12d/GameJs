/**
 * @author: xuweichen
 * @date: 13-3-21 下午4:25
 * @descriptions
 */
;(function (J){
    var requestAnimationFrame = (function() {
            return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                window.oRequestAnimationFrame      ||
                window.msRequestAnimationFrame     ||
                function(callback){
                    return window.setTimeout(callback, 1000 / 60);
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

    var DEFAULT_FPS = 60,
        NOOP = function(){};

    var Animate = new J.Class({
        Implements: 'event attr',
        constructor: function(options){
            var self = this;
            options && self.set(options);
            self.isPlay = false;
            self._runtime = {
                nextFrameTime: 0,
                frameIndex: 0,
                frameTime: 1000/ (self.get('fps')||DEFAULT_FPS)
            }
        },
        play: function(){
            var self = this,
                runtime = self._runtime;

            self.isPlay = true;
            runtime.nextFrameTime = Date.now();
            (function animloop(){
                self.__step();

                self.isPlay && (runtime.animateId = requestAnimationFrame(animloop));
            })();
            return self;
        },
        stop: function(){
            var self = this;
            self.isPlay = false;
            cancelAnimationFrame(self._runtime.animateId);
        },
        /**
         * @interface
         * implement in sub-class
         */
        step: NOOP,
        //@ animate
        __step: function(){
            var self = this,
                runtime = self._runtime,
                //now = Date.now(),
                loops = 0;

            while(Date.now() > runtime.nextFrameTime) {
                runtime.nextFrameTime += runtime.frameTime;
                loops++;
            }


            //draw
            if(loops) {
                //this._lastFrameTime = Date.now();
                self.trigger(Animate.ENTER_FRAME, {frame: runtime.frameIndex++});
                this.step();
            }
        }
    });

    Animate.START = 'start';
    Animate.FINISH = 'finish';
    Animate.ENTER_FRAME = 'enterFrame';
    return J.Animate = Animate;
})(J);
/*
var runtimeFps = 0;
var lastTick=Date.now();
window.animate = new J.Animate({
    fps: 60
}).on('enterFrame', function(){

    }).play();
var i=0;
setInterval(function(){
    document.body.appendChild(document.createElement('input'));
},50)
*/
