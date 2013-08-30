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
function resetTween (tween){

}

function doAnimation (){

}


var Tween = new J.Class({
    constructor: function(options){

        var self = this;

        self.options = {
            from: 0,
            fps: 60
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
    },
    Implements: 'event attr',
    start: function(){
        var from = this.get('from');
        this.set('frameSize', (this.get('to') - from)/(this.get('duration') * J.Stage.getSettings().fps));
        this.get('target')[this.get('property')] = from;
        //this.animator.play();
        this._isPlaying = true;
        return this;
    },
    play: function(){
        var self = this;

        self._isPlaying = true;

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
        //this.animator.stop();
        this._isPlaying = false;
        this.trigger(Tween.TWEEN_FINISH);
//        console.log(performance.now());
//        console.log(Date.now());
        return this;
    },
    pause: function(){
        //this.animator.stop();
        self._isPlaying = false;

        return this;
    },
    resume: function(){
        //this.animator.start();
        self._isPlaying = true;
        return this;
    }
});

Tween.TWEEN_START = 'tweenStart';
Tween.TWEEN_FINISH = 'tweenFinish';

return J.Tween = Tween;

})(J);
