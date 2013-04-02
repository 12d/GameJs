/**
 * Created with JetBrains WebStorm.
 * User: chen
 * Date: 13-3-23
 * Time: PM2:29
 * To change this template use File | Settings | File Templates.
 */
(function (J, undefined){
var settings;
var Stage = new J.Class({
    Implements: 'event attr',
    Extends:J.Container,
    constructor: function(options){
        var defaultOptions = {
                fps: 60,
                autoClear: true
            },
            self = this;

//        self.super(options);
//        console.log(self.super);
        console.log(options.width);
        self.set(settings=J.mix(defaultOptions, options));
        self.canvas = self.get('canvas');
        if(self.get('fps')>0){
            self.animator = new J.Animate({
                fps: self.get('fps')
            }).on({
                'tick': function(){
                    self.trigger(Stage.ENTER_FRAME);
                    self.update();
                }
            });
        }
    },
    resize: function(){

    },
    update: function(){
        var self = this,
            context = self.canvas.getContext('2d');

        //self._updateContext(context);
        context.clearRect(0,0,this.width, this.height);
        self.draw(context);

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

Stage.getSettings = function(){
    return settings;
}

Stage.ENTER_FRAME = 'enterFrame';

return J.Stage = Stage;
})(J);
