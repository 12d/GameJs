/**
 * @author: xuweichen
 * @date: 13-3-21 下午4:25
 * @descriptions
 */
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
        Implements: 'events',
        constructor: function(){
            this._nextFrameTime = 0;
            //this.__frameIndex = 0;
            this._frameTime = 1000/ this.get('fps');
        },
        start: function(){
            var self = this;
            self._nextFrameTime = Date.now();
            (function animloop(){
                self._step();
                requestAnimationFrame(animloop);
            })();
            return self;
        },
        pause: function(){

        },
        stop: function(){

        },
        resume: function(){

        },
        //@ animate
        _step: function(){
            var self = this,
                loops = 0;

            while(Date.now() > self._nextFrameTime) {
                //self.trigger(Game.ENTER_FRAME, {frame: self.__frameIndex++});
                self._nextFrameTime += self._frameTime;
                loops++;
            }

            //draw
            if(loops) {
                this.draw();
            }
        },
        /**
         * draw a frame for animation
         */
        draw: function(){

        }
    });
    return J.Animate = Animate;

})(J);