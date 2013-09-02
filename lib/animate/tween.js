/**
 * @author: xuweichen
 * @date: 13-3-21 下午4:26
 * @descriptions
 */

;(function (J, undefined){
/**
 # options template
 var defaultOptions = {
    duration: 1000,              // tween duration
    property: 'x',               // property of target, need to animate
    target: obj,                 // target need to animate
    from: 0,                    // start animation with property value specified
    to: 100,                    // end animation width property value specified
}
*/

function createAnimator (step, fps){
    return new J.Animate({fps: fps}).on({
        'tick': function(){
            step();
        }
    }).play();
}

var queue = new J.Queue();
var Tween = new J.Class({
    constructor: function(options){
        var self = this;

        self.options = {
            from: 0,
            fps: 60,
            async: true
        };

        J.mix(self.options, options);
        self.set(self.options);
        //self.set({'from': 100});

        self._animator = createAnimator(function (){
            self._move();
        }, self.get('fps'));

        self.timeline = new J.Timeline({
            tween: self
        });
        self._runtime = {};
        queue.add(self);
    },
    Implements: 'event attr',
    /*
    start: function(){
        var from = this.get('from');
        this.set('frameSize', (this.get('to') - from)/(this.get('duration') * J.Stage.getSettings().fps));
        this.get('target')[this.get('property')] = from;
        //this.animator.play();
        this._isPlaying = true;
        return this;
    },
    */
    play: function(){
        var self = this;

        self._isPlaying = true;
        Tween.isPlaying = true;
        return self;
    },
    timeline: function(timeline){
        //setter
        if(timeline) {
            this.timeline = timeline;

            return this
        }else{
            return timeline;
        }
    },
    _getDelta: function(){
        return this.get('frameSize');
    },
    _frameIndex: 0,
    _move: function (){
        var self = this,
            frames = self.timeline.frames,
            frameIndex = self._frameIndex,
            property = self.get('property'),
            target = self.get('target');

        if(frameIndex <= frames.length){
            target.style[property]=frames[frameIndex] +'px';
            self._frameIndex++;
        }else{
            self.stop();
        }

    },
    stop: function(){
        //resetTween(this);
        this._animator.stop();
        this._isPlaying = false;
        this.trigger(Tween.TWEEN_END);
//        console.log(performance.now());
//        console.log(Date.now());
        return this;
    },
    pause: function(){
        //this.animator.stop();
        this._isPlaying = false;

        return this;
    },
    resume: function(){
        //this.animator.start();
        this._isPlaying = true;
        return this;
    }
});
J.mix(Tween, {
    to: function(target, prop, to, duration, ease, async){
        var tween = new Tween({
            target: target,
            from: 0,
            to: to,
            easing: ease,
            property: prop,
            duration: duration,
            async: async
        });

        tween.on(tween.get('async') ? Tween.TWEEN_START : Tween.TWEEN_END, function(e){
            var next = queue.next();
            next && next.play();
        });
        if(!Tween.isPlaying || tween.get('async')){
            tween.play();
        } ;
        return this;
    },
    wait: function(){
        queue.last().set('async', false);
        return this;
    }
});
    Tween.isPlaying = false;
Tween.TWEEN_START = 'tweenStart';
Tween.TWEEN_END = 'tweenFinish';
return J.Tween = Tween;

})(J);

