/**
 * @author: xuweichen
 * @date: 13-3-21 下午4:25
 * @descriptions
 */
var fps = document.getElementById('fps');
(function (J){
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
        })()

    var Animate = new J.Class({
        Implements: 'event attr',
        constructor: function(options){
            var self = this;
            options && self.set(options);
            self._nextFrameTime = 0;
            self.__frameIndex = 0;
            self._frameTime = 1000/ self.get('fps');
            self.__runtimeFps = 0;
        },
        play: function(){
            var self = this;
            self._nextFrameTime = Date.now();
            (function animloop(){
                self._step();
                self._animateId = requestAnimationFrame(animloop);
            })();
            return self;
        },
        stop: function(){
            cancelAnimationFrame(this._animateId);
        },
        //@ animate
        _step: function(){
            var self = this,
                now = Date.now(),
                loops = 0;

            while(Date.now() > self._nextFrameTime) {
                self.trigger(Animate.ENTER_FRAME, {frame: self.__frameIndex++});
                self._nextFrameTime += self._frameTime;
                loops++;
            }


            //draw
            if(loops) {
                this._lastFrameTime = Date.now();
                this.draw();
            }
            self.__runtimeFps++;

            if(now - (self.__lastTick||(self.__lastTick=Date.now()))>=1000){
                fps.innerHTML=self.__runtimeFps;
                //console.log(self.__runtimeFps);
                self.__runtimeFps = 0;
                self.__lastTick = now;
            }
        },
        /**
         * draw a frame for animation
         */
        draw: function(){

        }
    });

    Animate.ENTER_FRAME = 'enterFrame';

    return J.Animate = Animate;
})(J);


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
