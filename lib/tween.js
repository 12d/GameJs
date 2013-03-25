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
    start: 0,                    // start animation with property value specified
    end: 100,                    // end animation width property value specified
    fps: 30                      //
}
*/

function createAnimator (step){
    return new J.Animate().on({
        'enterFrame': function(){
            step();
        }
    });
}
function resetTween (tween){

}

function doAnimation (){

}


var Tween = new J.Class({
    constructor: function(options){

        var self = this;
        J.mix(self.options, options);
        self.set(self.options);
        self.set({'from': 100});

        self.animator = createAnimator(function (){
            self._move();
        });

        self._runtime = {

        };
    },
    options: {
        fps: 30,
        from: 0
    },
    Implements: 'event attr',
    start: function(){
        var from = this.get('from');
        this.set('frameSize', (this.get('to') - from)/(this.get('duration')*this.get('fps')));
        this.get('target')[this.get('property')] = this.get('from');
        this.animator.play();
        return this;
    },
    _getDelta: function(){
        return this.get('frameSize');
    },
    _move: function (){
        var self = this,
            property = self.get('property'),
            target = self.get('target');

        if((target[property]+=self._getDelta())>=self.get('to')){
            self.stop();
        }

    },
    stop: function(){
        //resetTween(this);
        this.animator.stop();
        this.trigger(Tween.TWEEN_FINISH);
        return this;
    },
    pause: function(){
        this.animator.stop();
        return this;
    },
    resume: function(){
        this.animator.start();
        return this;
    }
});

Tween.TWEEN_START = 'tweenStart';
Tween.TWEEN_FINISH = 'tweenFinish';

return J.Tween = Tween;

})(J);
