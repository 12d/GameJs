/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-23
 * Time: PM2:29
 * To change this template use File | Settings | File Templates.
 */
(function (J, undefined){
var settings,
    tweens = [];

var Stage = new J.Class({
    Implements: 'event attr',
    Extends:J.Container,
    constructor: function(options){
        var defaultOptions = {
                fps: 60,
                autoClear: true
            },
            self = this;

//        self.super.call(self, options);
//        console.log(self.super);
//        console.log(options.width);
        self.set(settings=J.mix(defaultOptions, options));
        self.canvas = self.get('canvas');
        Stage.currentStage = this;
        //TODO : should be in timeline
        if(self.get('fps')>0){
            self.animator = new J.Animate({
                fps: self.get('fps')
            }).on({
                'tick': function(event){
                    self.trigger(Stage.ENTER_FRAME);
                    self.triggerTween();
                    self.update(event.data.frame);
                }
            });
        }
    },
    triggerTween: function(){
        tweens.forEach(function(tween){
            tween.trigger('tick');
        });
    },
    addTween: function(tween){
        tweens.push(tween);
        return this;
    },
    resize: function(){

    },
    update: function(frame){
        var self = this,
            context = self.canvas.getContext('2d');

        context.clearRect(0,0,this.width, this.height);
        self.draw(context, frame);

    },
    clear: function(){
    },
    stop: function(){
        this.animator.stop();
    },
    play: function(){
        this.animator.play();
        return this;
    }

});
/**
 * @static
 * @return {*}
 */
Stage.getSettings = function(){
    return settings;
}
/**
 * @static
 * @type {null}
 */
Stage.currentStage = null;

Stage.ENTER_FRAME = 'enterFrame';

return J.Stage = Stage;
})(J);
